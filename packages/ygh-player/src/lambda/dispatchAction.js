import './setup'
import {
  getEntities,
  getTriggers,
  getHunt,
  getHuntStateForPlayer,
  saveActionForHuntPlayer,
  applyAction,
} from './utils'

import firebase from '@firebase/app'

const db = firebase.firestore()

function equalsField(entities, instance, value, fieldName) {
  const entity = entities.find(({ id }) => id === instance.entity.id)
  const field = entity.fields.find(({ name }) => name === fieldName)
  const fieldValue = instance.fieldValues[fieldName]

  return field.isMulti
    ? fieldValue.includes(value)
    : fieldValue === value
}

function stateDiff(nextState, prevState) {
  return {
    instances: nextState.instances
      .filter(nextInstance => {
        const prevInstance = prevState.instances
          .find(({ id }) => id === nextInstance.id)
        return (
          nextInstance.state !== prevInstance.state ||
          Object.keys(nextInstance.inputValues).some(key =>
            nextInstance.inputValues[key] !== prevInstance.inputValues[key])
        )
      }),
    triggers: nextState.triggers
      .filter(nextTrigger => {
        const prevTrigger = prevState.triggers
          .find(({ id }) => id === nextTrigger.id)
        return nextTrigger.state !== prevTrigger.state
      })
  }
}

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { huntId, playerToken, action } = JSON.parse(event.body)

  if (!huntId || !playerToken || !action) {
    return { statusCode: 500, body: "Parameter Missing" }
  }

  const huntRef = db.collection('hunts').doc(huntId)
  const actionsRef = db.collection('actions')

  const [entities, triggers, hunt, state] = await Promise.all([
    getEntities(),
    getTriggers(),
    getHunt(huntId, playerToken),
    getHuntStateForPlayer(huntId, playerToken),
  ])
  const { actions } = hunt

  let newActions = []
  let newState = state

  const saveAction = saveActionForHuntPlayer(huntId, playerToken)

  // Save initial actions
  switch (action.type) {
    case 'use':
      const item = newState.instances
        .find(({ id }) => id === action.payload.itemId)

      newActions.push(await saveAction({
        type: actionsRef.doc('use'),
        payload: {
          instanceId: huntRef
            .collection('entities').doc(action.payload.itemId),
        }
      }))
      newState = applyAction({
        state: newState,
        action: newActions[newActions.length - 1],
        nodes: hunt.nodes,
      })
      newActions.push(await saveAction({
        type: actionsRef.doc('target-of-use'),
        payload: {
          instanceId: huntRef
            .collection('entities').doc(action.payload.instanceId),
          itemId: huntRef
            .collection('entities').doc(action.payload.itemId),
          item: {
            ref: huntRef.collection('entities').doc(item.entity.id),
            state: db.collection('entities').doc(item.entity.id)
                     .collection('states').doc(item.state),
          }
        },
      }))
      newState = applyAction({
        state: newState,
        action: newActions[newActions.length - 1],
        nodes: hunt.nodes,
      })
      break
    case 'input':
      newActions.push(await saveAction({
        type: actionsRef.doc('input'),
        payload: {
          ...action.payload,
          instanceId: huntRef
            .collection('entities').doc(action.payload.instanceId)
        }
      }))
      newState = applyAction({
        state: newState,
        action: newActions[newActions.length - 1],
        nodes: hunt.nodes,
      })
      break
    case 'trigger':
      newActions.push(await saveAction({
        type: actionsRef.doc('trigger'),
        payload: {
          ...action.payload,
          instanceId: huntRef
            .collection('triggers').doc(action.payload.instanceId)
        }
      }))
      newState = applyAction({
        state: newState,
        action: newActions[newActions.length - 1],
        nodes: hunt.nodes,
      })
      break
    default: break
  }

  // Check for possible transitions
  const transitionActions = [...actions, ...newActions]
    .filter(({ type }) => ['use', 'target-of-use', 'input'].includes(type.id))

  for (let instance of newState.instances) {
    const entity = entities.find(({ id }) => id === instance.entity.id)
    if (!entity) { continue }
    const entityState = entity.states.find(({ id }) => id === instance.state)
    if (!entityState || !entityState.transitions) { continue }

    for (let transition of entityState.transitions) {
      const { to, requiredActions } = transition
      const targetedActions = transitionActions
        .filter(({ payload: { instanceId } }) => instanceId.id === instance.id)

      if (requiredActions.every(({ type, payload }) =>
        targetedActions.some(newAction => {
          if (newAction.type.id !== type) { return false }
          switch (type) {
            case 'use': return true
            case 'target-of-use': return (
              newAction.payload.item.ref.id === payload.item.ref &&
              newAction.payload.item.state.id === payload.item.state
            )
            case 'input':
              return payload.requiredValues.every(({
                key, eqValue, eqField, neqValue, neqField
              }) => {
                const value = instance.inputValues[key]
                return (
                  (eqValue === null || value === eqValue) &&
                  (neqValue === null || value !== neqValue) &&
                  (eqField === null || equalsField(
                    entities, instance, value, eqField
                  )) &&
                  (neqField === null || !equalsField(
                    entities, instance, value, neqField
                  ))
                )
              })
          }
        })
      )) {
        newActions.push(await saveAction({
          type: actionsRef.doc('transform'),
          payload: {
            instanceId: huntRef.collection('entities').doc(instance.id),
            to: to
              ? db.collection('entities').doc(instance.entity.id)
                  .collection('states').doc(to)
              : null,
          }
        }))
        newState = applyAction({
          state: newState,
          action: newActions[newActions.length - 1],
          nodes: hunt.nodes,
        })
      }
    }
  }

  // Check for unlocks | appears
  for (let newAction of newActions) {
    const { type, payload: { instanceId, to } } = newAction
    switch (type.id) {
      case 'transform':
        const instance = newState.instances
          .find(({ id }) => id === instanceId.id)

        const instanceNode = hunt.nodes.find(({ entity }) => (
          entity &&
          entity.ref === instance.id &&
          entity.state === instance.state
        ))

        if (to === null) {
          newActions.push(await saveAction({
            type: actionsRef.doc('disappear'),
            payload: {
              instanceId,
            }
          }))
        } else {
          const transformedInstanceNode = hunt.nodes.find(({ entity }) => (
            entity &&
            entity.ref === instance.id &&
            entity.state === to.id
          ))
          newActions.push(await saveAction({
            type: actionsRef.doc('appear'),
            payload: {
              node: huntRef.collection('nodes').doc(transformedInstanceNode.id)
            }
          }))
        }
        newState = applyAction({
          state: newState,
          action: newActions[newActions.length - 1],
          nodes: hunt.nodes,
        })

        for (let eventListener of instanceNode
          .eventListeners
          .filter(({ on }) => on === 'transform')
        ) {
          newActions.push(await saveAction({
            type: actionsRef.doc(eventListener.performAction.type),
            payload: {
              ...eventListener.performAction.payload,
              node: huntRef
                .collection('nodes')
                .doc(eventListener.performAction.payload.node)
            }
          }))
          newState = applyAction({
            state: newState,
            action: newActions[newActions.length - 1],
            nodes: hunt.nodes,
          })
        }
        break
      case 'trigger':
        const triggerNode = hunt.nodes.find(({ trigger }) => (
          trigger &&
          trigger === instanceId.id
        ))
        for (let eventListener of triggerNode
          .eventListeners
          .filter(({ on }) => on === 'trigger')
        ) {
          newActions.push(await saveAction({
            type: actionsRef.doc(eventListener.performAction.type),
            payload: {
              ...eventListener.performAction.payload,
              node: huntRef
                .collection('nodes')
                .doc(eventListener.performAction.payload.node)
            }
          }))
          newState = applyAction({
            state: newState,
            action: newActions[newActions.length - 1],
            nodes: hunt.nodes,
          })
        }
        break
      default: break
    }
  }

  const changedState = stateDiff(newState, state)
  return {
    statusCode: 200,
    body: JSON.stringify(changedState)
  }
}

/*
GAME PLAN:
1. Load all entities, triggers, actions etc.
2. If action is possible, continue to 3, else exit
3. Save action to firebase
4. For each cascading action inherent to the action, go to 2
5. For each cascading action from transitions in entities + triggers, go to 2
6. For each cascading action from eventListeners in hunt nodes, go to 2

CASCADE RULES:
(input | target-of-use) -> transform
target-of-use -> transform
use -> (target-of-use & transform)
(transform | trigger) -> (unlock | appear)
unlock | appear -> ()

requiredActions include input, use and target-of-use
eventListeners check for transform or trigger
*/
