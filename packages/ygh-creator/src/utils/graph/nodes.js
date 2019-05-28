import { NODE_TYPES } from "data"
import PriorityQueue from "tinyqueue"
import _ from "utils"

const getSortedStates = entity => {
  const startStates = _.getMinimalStateSpanInverse(entity.states)

  const sortedStates =
    startStates.length === 0
      ? entity.defaultState &&
        entity.states.some(state => state.id === entity.defaultState.id)
        ? entity.states.filter(state => state.id === entity.defaultState.id)
        : entity.states.filter(({ outgoingTransitions }) =>
            outgoingTransitions.every(({ to }) => to)
          )
      : startStates.length > 1 &&
        entity.defaultState &&
        startStates.some(state => state.id === entity.defaultState.id)
      ? startStates.filter(state => state.id === entity.defaultState.id)
      : startStates

  const todo = new PriorityQueue(sortedStates.slice())

  while (todo.length > 0) {
    const state = todo.pop()

    state.outgoingTransitions.forEach(({ to }) => {
      if (to && sortedStates.every(({ id }) => id !== to.id)) {
        const nextState = entity.states.find(({ id }) => id === to.id)
        todo.push(nextState)
        sortedStates.push(nextState)
      }
    })
  }

  return sortedStates
}

const calcNodesForEntity = entity => {
  const entityNode = {
    type: NODE_TYPES.ENTITY,
    id: entity.id,
    entity
  }

  const entryNodes =
    entity.isContainer || entity.isObject
      ? []
      : entity.states.every(state => state.unlockedBy.length === 0)
      ? [
          {
            type: NODE_TYPES.ENTRY,
            id: `${entity.id}-${NODE_TYPES.ENTRY}`,
            entity
          }
        ]
      : []

  const stateNodes = entity.isContainer
    ? []
    : getSortedStates(entity).map(state => ({
        type: NODE_TYPES.STATE,
        id: state.id,
        entity,
        state
      }))

  const exitNodes = entity.isContainer
    ? []
    : entity.states.some(({ outgoingTransitions }) =>
        outgoingTransitions.some(({ to }) => to === null)
      )
    ? [
        {
          type: NODE_TYPES.EXIT,
          id: `${entity.id}-${NODE_TYPES.EXIT}`,
          entity
        }
      ]
    : []

  const informationSlotNodes = entity.isContainer
    ? []
    : entity.informationSlots.map(informationSlot => ({
        type: NODE_TYPES.INFORMATION_SLOT,
        id: informationSlot.id,
        entity,
        informationSlot
      }))

  const fieldNodes = entity.isContainer
    ? []
    : entity.fields
        .filter(field => field.isSecret)
        .map(field => ({
          type: NODE_TYPES.FIELD,
          id: field.id,
          entity,
          field
        }))

  const portalNodes = entity.isContainer
    ? []
    : entity.portals.map(portal => ({
        type: NODE_TYPES.PORTAL,
        id: portal.id,
        entity,
        portal
      }))

  const entranceNodes = entity.isContainer
    ? entity.entrances.map(entrance => ({
        type: NODE_TYPES.ENTRANCE,
        id: entrance.id,
        entity,
        entrance
      }))
    : []

  return [
    entityNode,
    ...entryNodes,
    ...stateNodes,
    ...exitNodes,
    ...fieldNodes,
    ...informationSlotNodes,
    ...portalNodes,
    ...entranceNodes
  ]
}

const calcNodes = entities => entities.flatMap(calcNodesForEntity)

export default calcNodes
