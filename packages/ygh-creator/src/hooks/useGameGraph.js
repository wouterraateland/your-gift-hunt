import hash from "object-hash"
import { NODE_TYPES, EDGE_TYPES } from "data"

const getStartInstanceIds = instances =>
  instances
    .filter(({ entity }) => entity.name === "Start trigger")
    .map(({ id }) => id)

const getNodes = (startInstanceIds, instances) => [
  ...instances
    .filter(
      ({ id, states }) =>
        !startInstanceIds.includes(id) &&
        (states.some(
          ({ unlockedBy }) =>
            unlockedBy && startInstanceIds.includes(unlockedBy.from.instance.id)
        ) ||
          states.every(({ unlockedBy }) => !unlockedBy))
    )
    .map(instance => ({
      id: `${instance.id}-${NODE_TYPES.ENTRY}`,
      instance,
      state: null,
      type: NODE_TYPES.ENTRY
    })),
  ...instances
    .filter(({ id }) => !startInstanceIds.includes(id))
    .flatMap(({ states, ...instance }) =>
      states.map(state => ({
        id: state.id,
        instance,
        state,
        type: NODE_TYPES.STATE
      }))
    ),
  ...instances
    .filter(
      ({ id, states }) =>
        !startInstanceIds.includes(id) &&
        states.some(({ state: { outgoingTransitions } }) =>
          outgoingTransitions.some(({ to }) => to === null)
        )
    )
    .map(instance => ({
      id: `${instance.id}-${NODE_TYPES.EXIT}`,
      instance,
      state: null,
      type: NODE_TYPES.EXIT
    }))
]

const getNodeByInstanceAndState = nodes => (
  instance,
  state,
  type = NODE_TYPES.EXIT
) =>
  nodes.find(
    node =>
      node.instance.id === instance.id &&
      (state
        ? node.state && node.state.state.id === state.id
        : node.type === type)
  )

const getStartTransitions = (startInstanceIds, nodes) =>
  nodes
    .filter(
      ({ state, instance }) =>
        state &&
        (state.unlockedBy
          ? startInstanceIds.includes(state.unlockedBy.from.instance.id)
          : instance.entity.defaultState &&
            instance.entity.defaultState.id === state.state.id)
    )
    .map(({ id, instance }) => ({
      from: `${instance.id}-${NODE_TYPES.ENTRY}`,
      to: id,
      type: EDGE_TYPES.ENTRY
    }))

const getTransformTransitions = nodes =>
  nodes
    .filter(({ state }) => state && state.state.outgoingTransitions.length > 0)
    .flatMap(node =>
      node.state.state.outgoingTransitions.map(({ to }) => ({
        from: node.id,
        to: getNodeByInstanceAndState(nodes)(node.instance, to).id,
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
          to: to ? to.id : `${node.instance.id}-${NODE_TYPES.EXIT}`,
          unlocks: unlock.id,
          type: EDGE_TYPES.UNLOCK
        }))
      )
    )

const getUseTransitions = nodes =>
  nodes
    .filter(({ state }) => state && state.state.outgoingTransitions.length > 0)
    .flatMap(node =>
      node.state.state.outgoingTransitions.flatMap(({ requiredActions }) =>
        requiredActions
          .filter(({ type }) => type === "USE")
          .map(({ payload: { requiredEntity: { entity, state } } }) => ({
            from: node.id,
            to: nodes.find(
              node =>
                node.instance.entity.id === entity.id &&
                node.state &&
                node.state.state.id === state.id
            ).id,
            type: EDGE_TYPES.USE
          }))
      )
    )

const getEdges = (startInstanceIds, nodes) =>
  [
    ...getStartTransitions(startInstanceIds, nodes),
    ...getTransformTransitions(nodes),
    ...getUnlockTransitions(nodes),
    ...getUseTransitions(nodes)
  ].map(({ from, to, unlocks, type }) => ({
    id: hash([from, to, unlocks, type]),
    from,
    to,
    unlocks,
    type
  }))

const getNodeById = nodes => nodeId => nodes.find(({ id }) => id === nodeId)

const useGameGraph = instances => {
  const startInstanceIds = getStartInstanceIds(instances)
  const nodes = getNodes(startInstanceIds, instances)
  const edges = getEdges(startInstanceIds, nodes)

  return {
    nodes,
    edges,
    getNodeById: getNodeById(nodes),
    getNodeByInstanceAndState: getNodeByInstanceAndState(nodes)
  }
}

export default useGameGraph
