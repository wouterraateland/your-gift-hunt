import { useMemo } from "react"
import hash from "object-hash"
import { NODE_TYPES, EDGE_TYPES } from "data"
import _ from "utils"

const getStartInstanceIds = instances =>
  instances
    .filter(({ entity }) => entity.name === "Start trigger")
    .map(({ id }) => id)

const getNodes = (startInstanceIds, instances) => [
  ...instances
    .filter(
      ({ id, states }) =>
        !startInstanceIds.includes(id) &&
        (states.some(({ unlockedBy }) =>
          unlockedBy.some(({ from }) =>
            startInstanceIds.includes(from.instance.id)
          )
        ) ||
          states.every(({ unlockedBy }) => unlockedBy.length === 0))
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
        states.some(({ outgoingTransitions }) =>
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
        (state.unlockedBy.length
          ? state.unlockedBy.some(({ from }) =>
              startInstanceIds.includes(from.instance.id)
            )
          : (instance.entity.defaultState &&
              instance.entity.defaultState.id === state.state.id) ||
            state.incomingTransitions.length === 0)
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
      node.state.outgoingTransitions.map(({ to }) => ({
        from: node.id,
        to: to ? to.id : `${node.instance.id}-${NODE_TYPES.EXIT}`, //getNodeByInstanceAndState(nodes)(node.instance, to).id,
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

const chooseRandom = xs => xs[Math.floor(Math.random() * xs.length)]

const getOtherEntryTransitions = instances =>
  instances
    .filter(({ entity, states }) =>
      states.every(
        state =>
          state.unlockedBy.length === 0 &&
          state.incomingTransitions.length > 0 &&
          (!entity.defaultState || entity.defaultState.id !== state.state.id)
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

const getEdges = (startInstanceIds, nodes, instances) =>
  [
    ...getStartTransitions(startInstanceIds, nodes),
    ...getTransformTransitions(nodes),
    ...getUnlockTransitions(nodes),
    ...getUseTransitions(nodes),
    ...getOtherEntryTransitions(instances)
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

const useGameGraph = instances => {
  const startInstanceIds = useMemo(() => getStartInstanceIds(instances), [
    instances
  ])
  const nodes = useMemo(() => getNodes(startInstanceIds, instances), [
    instances
  ])
  const edges = useMemo(() => getEdges(startInstanceIds, nodes, instances), [
    startInstanceIds,
    nodes,
    instances
  ])

  return {
    nodes,
    edges,
    getNodeById: getNodeById(nodes),
    getNodeByInstanceAndState: getNodeByInstanceAndState(nodes),
    getEdgeById: getEdgeById(nodes, edges)
  }
}

export default useGameGraph
