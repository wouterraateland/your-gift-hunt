import { useMemo } from "react"
import hash from "object-hash"
import { NODE_TYPES, EDGE_TYPES } from "data"
import _ from "utils"

const getNodes = entities => [
  ...entities
    .filter(({ states }) =>
      states.every(({ unlockedBy }) => unlockedBy.length === 0)
    )
    .map(entity => ({
      id: `${entity.id}-${NODE_TYPES.ENTRY}`,
      entity,
      state: null,
      type: NODE_TYPES.ENTRY
    })),
  ...entities.flatMap(({ states, ...entity }) =>
    states.map(state => ({
      id: state.id,
      entity,
      state,
      type: NODE_TYPES.STATE
    }))
  ),
  ...entities
    .filter(({ states }) =>
      states.some(({ outgoingTransitions }) =>
        outgoingTransitions.some(({ to }) => to === null)
      )
    )
    .map(entity => ({
      id: `${entity.id}-${NODE_TYPES.EXIT}`,
      entity,
      state: null,
      type: NODE_TYPES.EXIT
    }))
]

const getNodeByInstanceAndState = nodes => (
  entity,
  state,
  type = NODE_TYPES.EXIT
) =>
  nodes.find(
    node =>
      node.entity.id === entity.id &&
      (state
        ? node.state && node.state.state.id === state.id
        : node.type === type)
  )

const getStartTransitions = nodes =>
  nodes
    .filter(
      ({ state, entity }) =>
        state &&
        !state.unlockedBy.length &&
        ((entity.defaultState && entity.defaultState.id === state.id) ||
          state.incomingTransitions.length === 0)
    )
    .map(({ id, entity }) => ({
      from: `${entity.id}-${NODE_TYPES.ENTRY}`,
      to: id,
      type: EDGE_TYPES.ENTRY
    }))

const getTransformTransitions = nodes =>
  nodes
    .filter(({ state }) => state && state.outgoingTransitions.length > 0)
    .flatMap(node =>
      node.state.outgoingTransitions.map(({ to }) => ({
        from: node.id,
        to: to ? to.id : `${node.entity.id}-${NODE_TYPES.EXIT}`,
        type: to ? EDGE_TYPES.TRANSFORM : EDGE_TYPES.EXIT
      }))
    )

const getUnlockTransitions = nodes =>
  nodes
    .filter(({ state }) => state && state.outgoingTransitions.length > 0)
    .flatMap(node =>
      node.state.outgoingTransitions.flatMap(({ to, unlocks }) =>
        unlocks.map(unlock => ({
          from: node.id,
          to: to ? to.id : `${node.entity.id}-${NODE_TYPES.EXIT}`,
          unlocks: unlock.id,
          type: EDGE_TYPES.UNLOCK
        }))
      )
    )

const getUseTransitions = nodes =>
  nodes
    .filter(({ state }) => state && state.outgoingTransitions.length > 0)
    .flatMap(node =>
      node.state.outgoingTransitions.flatMap(({ requiredActions }) =>
        requiredActions
          .filter(({ type }) => type === "USE")
          .map(({ payload: { requiredEntity: { entityState } } }) => ({
            from: node.id,
            to: nodes.find(
              node => node.state && node.state.id === entityState.id
            ).id,
            type: EDGE_TYPES.USE
          }))
      )
    )

const getInfoEdges = nodes =>
  nodes
    .filter(({ state }) => state)
    .flatMap(({ id, entity, state }) =>
      entity.informationSlots
        .filter(
          informationSlot =>
            informationSlot.field &&
            state.availableInformationSlots.some(
              otherInformationSlot =>
                otherInformationSlot.id === informationSlot.id
            )
        )
        .flatMap(information =>
          nodes
            .filter(
              ({ entity, state }) =>
                state &&
                entity.fieldValues.some(
                  ({ id }) => id === information.fieldValue.id
                ) &&
                state.state.outgoingTransitions.some(({ requiredActions }) =>
                  requiredActions.some(({ payload: { requiredValues } }) =>
                    requiredValues.some(
                      ({ field }) =>
                        field && field.id === information.fieldValue.field.id
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

const chooseRandom = xs => xs[Math.floor(Math.random() * xs.length)]

const getOtherEntryTransitions = entities =>
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
      to: chooseRandom(
        states
          .filter(state => state.outgoingTransitions.every(({ to }) => to))
          .map(state => state.id)
      ),
      type: EDGE_TYPES.ENTRY
    }))

const getEdges = (nodes, entities) =>
  [
    ...getStartTransitions(nodes),
    ...getTransformTransitions(nodes),
    ...getUnlockTransitions(nodes),
    ...getUseTransitions(nodes),
    ...getOtherEntryTransitions(entities),
    ...getInfoEdges(nodes)
  ].map(({ from, to, unlocks, type }) => ({
    id: hash([from, to, unlocks, type]),
    from,
    to,
    unlocks,
    type
  }))

const getNodeById = nodes => nodeId => nodes.find(({ id }) => id === nodeId)

const getEdgeById = (nodes, edges) =>
  _.compose(
    edge =>
      edge
        ? {
            ...edge,
            from: getNodeById(nodes)(edge.from),
            to: getNodeById(nodes)(edge.to),
            unlocks: getNodeById(nodes)(edge.unlocks)
          }
        : edge,
    edgeId => edges.find(({ id }) => id === edgeId)
  )

const isUnlockable = edges => ({ id, entity, type }, ignoreIsObject = false) =>
  type === NODE_TYPES.STATE &&
  (ignoreIsObject || !entity.isObject) &&
  edges.some(
    ({ type, to, unlocks }) =>
      (type === EDGE_TYPES.ENTRY && to === id) ||
      (type === EDGE_TYPES.UNLOCK && unlocks === id)
  )

const useGameGraph = entities => {
  const nodes = useMemo(() => getNodes(entities), [entities])
  const edges = useMemo(() => getEdges(nodes, entities), [nodes, entities])

  return {
    nodes,
    edges,
    getNodeById: getNodeById(nodes),
    getNodeByInstanceAndState: getNodeByInstanceAndState(nodes),
    getEdgeById: getEdgeById(nodes, edges),
    isUnlockable: isUnlockable(edges)
  }
}

export default useGameGraph
