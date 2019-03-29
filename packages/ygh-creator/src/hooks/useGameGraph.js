import { useCallback, useMemo } from "react"
import hash from "object-hash"
import { NODE_TYPES, EDGE_TYPES } from "data"
import _ from "utils"

const toNode = type => (entity, state = null) => ({
  id: type === NODE_TYPES.STATE ? state.id : `${entity.id}-${type}`,
  entity,
  state: type === NODE_TYPES.STATE ? state : null,
  type
})

const getEntryNodes = entities =>
  entities
    .filter(({ states }) =>
      states.every(({ unlockedBy }) => unlockedBy.length === 0)
    )
    .map(toNode(NODE_TYPES.ENTRY))

const getStateNodes = entities =>
  entities.flatMap(({ states, ...entity }) =>
    states.map(state => toNode(NODE_TYPES.STATE)(entity, state))
  )

const getExitNodes = entities =>
  entities
    .filter(({ states }) =>
      states.some(({ outgoingTransitions }) =>
        outgoingTransitions.some(({ to }) => to === null)
      )
    )
    .map(toNode(NODE_TYPES.EXIT))

const getNodes = entities => [
  ...getEntryNodes(entities),
  ...getStateNodes(entities),
  ...getExitNodes(entities)
]

const getEntryEdges = nodes =>
  nodes
    .filter(
      ({ state, entity }) =>
        state.unlockedBy.length === 0 &&
        ((entity.defaultState && entity.defaultState.id === state.id) ||
          state.incomingTransitions.length === 0)
    )
    .map(({ id, entity }) => ({
      from: `${entity.id}-${NODE_TYPES.ENTRY}`,
      to: id,
      type: EDGE_TYPES.ENTRY
    }))

const getTransformEdges = nodes =>
  nodes.flatMap(({ id, entity, state }) =>
    state.outgoingTransitions.map(({ to }) => ({
      from: id,
      to: to ? to.id : `${entity.id}-${NODE_TYPES.EXIT}`,
      type: to ? EDGE_TYPES.TRANSFORM : EDGE_TYPES.EXIT
    }))
  )

const getUnlockEdges = nodes =>
  nodes.flatMap(({ id, entity, state }) =>
    state.outgoingTransitions.flatMap(({ to, unlocks }) =>
      unlocks.map(unlock => ({
        from: id,
        to: to ? to.id : `${entity.id}-${NODE_TYPES.EXIT}`,
        unlocks: unlock.id,
        type: EDGE_TYPES.UNLOCK
      }))
    )
  )

const getUseEdges = nodes =>
  nodes.flatMap(({ id, state: { outgoingTransitions } }) =>
    outgoingTransitions.flatMap(({ requiredActions }) =>
      requiredActions
        .filter(({ type }) => type === "USE")
        .map(({ payload: { requiredEntity: { entityState } } }) => ({
          from: id,
          to: entityState.id,
          type: EDGE_TYPES.USE
        }))
    )
  )

const getInfoEdges = nodes =>
  nodes.flatMap(
    ({
      id,
      entity: { informationSlots },
      state: { availableInformationSlots }
    }) =>
      informationSlots
        .filter(
          ({ id, field }) =>
            field &&
            availableInformationSlots.some(
              availableSlot => availableSlot.id === id
            )
        )
        .flatMap(informationSlot =>
          nodes
            .filter(
              ({ entity, state }) =>
                entity.fields.some(
                  ({ id }) => id === informationSlot.field.id
                ) &&
                state.outgoingTransitions.some(({ requiredActions }) =>
                  requiredActions.some(({ payload: { requiredValues } }) =>
                    requiredValues.some(
                      ({ field }) =>
                        field && field.id === informationSlot.field.id
                    )
                  )
                )
            )
            .map(to => ({
              from: id,
              to: to.id,
              type: EDGE_TYPES.INFO
            }))
        )
  )

const getOtherEntryEdges = entities =>
  entities
    .filter(({ defaultState, states }) =>
      states.every(
        state =>
          state.unlockedBy.length === 0 &&
          state.incomingTransitions.length > 0 &&
          (!defaultState || defaultState.id !== state.id)
      )
    )
    .map(({ id, states }) => ({
      from: `${id}-${NODE_TYPES.ENTRY}`,
      to: _.chooseRandom(
        states.filter(state => state.outgoingTransitions.every(({ to }) => to))
      ).id,
      type: EDGE_TYPES.ENTRY
    }))

const getEdges = (nodes, entities) => {
  const statefullNodes = nodes.filter(({ type }) => type === NODE_TYPES.STATE)
  return [
    ...getEntryEdges(statefullNodes),
    ...getTransformEdges(statefullNodes),
    ...getUnlockEdges(statefullNodes),
    ...getUseEdges(statefullNodes),
    ...getInfoEdges(statefullNodes),
    ...getOtherEntryEdges(entities)
  ].map(edge => ({
    ...edge,
    id: hash(Object.values(edge))
  }))
}

const useGameGraph = entities => {
  const nodes = useMemo(() => getNodes(entities), [entities])
  const edges = useMemo(() => getEdges(nodes, entities), [nodes, entities])

  const getNodeById = useCallback(
    nodeId => nodes.find(({ id }) => id === nodeId),
    [nodes]
  )
  const getEdgeById = useCallback(
    _.compose(
      edge =>
        edge
          ? {
              ...edge,
              from: getNodeById(edge.from),
              to: getNodeById(edge.to),
              unlocks: getNodeById(edge.unlocks)
            }
          : edge,
      edgeId => edges.find(({ id }) => id === edgeId)
    ),
    [nodes, edges]
  )

  const isUnlockable = useCallback(
    ({ id, entity, type }, ignoreIsObject = false) =>
      type === NODE_TYPES.STATE &&
      (ignoreIsObject || !entity.isObject) &&
      edges.some(
        ({ type, to, unlocks }) =>
          (type === EDGE_TYPES.ENTRY && to === id) ||
          (type === EDGE_TYPES.UNLOCK && unlocks === id)
      ),
    [edges]
  )

  return {
    nodes,
    edges,
    getNodeById,
    getEdgeById,
    isUnlockable
  }
}

export default useGameGraph
