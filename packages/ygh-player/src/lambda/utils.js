import './setup'
import firebase from '@firebase/app'

const db = firebase.firestore()

export const identity = x => x

const removeKeys = (keysToBeRemoved, object) => Object.keys(object).reduce(
  ((acc, key) => keysToBeRemoved.includes(key)
    ? acc
    : { ...acc, [key]: object[key] }
  ),
  {}
)

export const toList = (snapshot, map=identity) => {
  const list = []
  snapshot.forEach(doc => list.push({ id: doc.id, ...map(doc.data(), doc.id) }))
  return list
}

const parsePayloadForActionType = (payload, type) => {
  if (!payload) { return null }

  switch (type.id) {
    case 'combine':
    case 'use':
      return {
        target: payload.target
          ? {
              ref: payload.target.ref.id,
              state: payload.target.state.id,
            }
          : null
      }
    case 'transform':
      return { transformation: payload.transformation }
    case 'target-of-use':
      return {
        item: payload.item
          ? {
              ref: payload.item.ref.id,
              state: payload.item.state.id,
            }
          : null
      }
    case 'unlock':
    case 'appear':
      return {
        node: payload.node
          ? payload.node.id
          : null
      }
    default: return payload
  }
}

function memoize(method, timeout=Infinity) {
    let cache = {};

    return async function() {
        let args = JSON.stringify(arguments)
        if (!cache[args] || Date.now() - cache[args].timestamp >= timeout) {
          cache[args] = {
            value: method.apply(this, arguments),
            timestamp: Date.now(),
          }
        }
        return cache[args].value
    };
}

export const getTriggers = memoize(async () => toList(
  await db.collection('triggers').get()
))

export const getEntities = memoize(async () => {
  const entities = toList(
    await db.collection('entities').get()
  )

  for (let entity of entities) {
    entity.states = toList(
      await db.collection('entities').doc(entity.id)
        .collection('states').get(),
      ({ transitions, ...state }) => ({
        ...state,
        transitions: transitions.map(({ to, requiredActions }) => ({
          to: to ? to.id : null,
          requiredActions: requiredActions.map(({ type, payload, ...action }) => ({
            ...action,
            type: type.id,
            payload: parsePayloadForActionType(payload, type)
          }))
        }))
      })
    )
  }

  return entities
})

export const getHuntNodes = memoize(async huntId => toList(
  await db.collection('hunts').doc(huntId).collection('nodes').get(),
  ({ type, entity, trigger, eventListeners }) => ({
    type,
    entity: entity
      ? {
          ref: entity.ref.id,
          state: entity.state.id,
        }
      : null,
    trigger: trigger
      ? trigger.id
      : null,
    eventListeners: eventListeners.map(({ on, performAction }) => ({
      on: on.id,
      performAction: {
        type: performAction.type.id,
        payload: parsePayloadForActionType(
          performAction.payload,
          performAction.type
        )
      }
    })),
  })
))

export const getHuntTriggers = memoize(async huntId => toList(
  await db.collection('hunts').doc(huntId)
          .collection('triggers').get(),
  ({ trigger, ...rest }) => ({
    trigger: trigger.id,
    ...rest,
  })
))

export const getHuntEntities = memoize(async huntId => toList(
  await db.collection('hunts').doc(huntId)
          .collection('entities').get(),
  ({ entity, ...rest }) => ({
    entity: entity.id,
    ...rest,
  })
))

export const getHuntActions = async (huntId, playerToken) => toList(
  await db.collection('hunts').doc(huntId)
          .collection('players').doc(playerToken)
          .collection('actions').orderBy('createdAt').get()
)

export const saveActionForHuntPlayer = (huntId, playerToken) =>
  async (action) => {
    await db.collection('hunts').doc(huntId)
            .collection('players').doc(playerToken)
            .collection('actions').add({
              ...action,
              createdAt: new Date(),
            })
    return action
  }

export const getHunt = async (huntId, playerToken) => {
  const huntRef = db.collection('hunts').doc(huntId)

  const [nodes, entities, triggers, actions] = await Promise.all([
    getHuntNodes(huntId),
    getHuntEntities(huntId),
    getHuntTriggers(huntId),
    getHuntActions(huntId, playerToken)
  ])

  return {
    nodes,
    entities,
    triggers,
    actions,
  }
}

const getStartState = (hunt, entities, triggers) => ({
  instances: hunt.entities.map(({
    fieldValues,
    entity: entityId,
    ...rest
  }) => {
    const entity = entities.find(entity => entity.id === entityId)
    return {
      ...rest,
      entity: removeKeys(['states', 'fields'], entity),
      state: null,
      inputValues: {},
      fieldValues: entity.fields.reduce((acc, field) => field.isSecret
      ? acc
      : {
        ...acc,
        [field.name]: fieldValues[field.name]
      }, {})
    }
  }),
  triggers: hunt.triggers.map(({
    fieldValues,
    trigger: triggerId,
    ...rest
  }) => {
    const trigger = triggers.find(trigger => trigger.id === triggerId)
    return {
      ...rest,
      trigger: removeKeys(['fields'], trigger),
      state: triggerId === 'start',
      fieldValues: trigger.fields.reduce((acc, field) => field.isSecret
      ? acc
      : {
        ...acc,
        [field.name]: fielValues[field.name]
      }, {})
    }
  })
})

export const applyAction = ({
  state,
  action,
  nodes,
}) => {
  switch(action.type.id) {
    case 'trigger':
      return {
        ...state,
        triggers: state.triggers.map(trigger => ({
          ...trigger,
          state: action.payload.instanceId.id === trigger.id
            ? false : trigger.state
        }))
      }
    case 'disappear':
      return {
        ...state,
        instances: state.instances.map(instance => {
          return instance.id === action.payload.instanceId.id
            ? { ...instance, state: null } : instance
        })
      }
    case 'unlock':
    case 'appear':
      const node = nodes.find(({ id }) => id === action.payload.node.id)
      switch (node.type) {
        case 'entity':
          return {
            ...state,
            instances: state.instances.map(instance => {
              return instance.id === node.entity.ref
                ? { ...instance, state: node.entity.state } : instance
              }
            )
          }
        case 'trigger':
          return {
            ...state,
            triggers: state.triggers.map(triggerInstance =>
              triggerInstance.id === node.trigger
                ? { ...triggerInstance, state: true } : triggerInstance
            )
          }
      }
    case 'input':
      return {
        ...state,
        instances: state.instances.map(instance =>
          instance.id === action.payload.instanceId.id
            ? {
              ...instance,
              inputValues: {
                ...instance.inputValues,
                ...action.payload.inputValues,
              }
            } : instance
        )
      }
    default: return state
  }
}

export const getHuntStateForPlayer = async (huntId, playerToken) => {
  const [triggers, entities, hunt] = await Promise.all([
    getTriggers(),
    getEntities(),
    getHunt(huntId, playerToken),
  ])

  return hunt.actions.reduce(
    (state, action) => applyAction({
      state,
      action,
      nodes: hunt.nodes,
    }),
    getStartState(hunt, entities, triggers)
  )
}
