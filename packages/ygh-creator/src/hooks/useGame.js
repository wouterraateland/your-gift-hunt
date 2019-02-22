import moment from "moment"

import { useState } from "react"
import { useQuery } from "react-apollo-hooks"
import { GAME_BY_SLUG } from "gql/queries"

import TransitionArrow from "components/TransitionArrow"

const useGameData = ({ creatorSlug, gameSlug }) => {
  const { data, error } = useQuery(GAME_BY_SLUG, {
    variables: { creatorSlug, gameSlug }
  })

  if (error) {
    throw error
  }

  return data.games.length === 1 ? data.games[0] : null
}

const getStartInstanceIds = instances =>
  instances
    .filter(({ entity }) => entity.name === "Start trigger")
    .map(({ id }) => id)

const getNodes = (startInstanceIds, instances) => [
  ...instances
    .filter(({ states }) =>
      states.some(
        ({ unlockedBy }) =>
          unlockedBy && startInstanceIds.includes(unlockedBy.from.instance.id)
      )
    )
    .map(instance => ({
      id: `${instance.id}-entry`,
      instance,
      state: null,
      type: "entry"
    })),
  ...instances
    .filter(({ id }) => !startInstanceIds.includes(id))
    .flatMap(({ states, ...instance }) =>
      states.map(state => ({
        id: state.id,
        instance,
        state,
        type: "state"
      }))
    ),
  ...instances
    .filter(({ states }) =>
      states.some(({ state: { outgoingTransitions } }) =>
        outgoingTransitions.some(({ to }) => to === null)
      )
    )
    .map(instance => ({
      id: `${instance.id}-exit`,
      instance,
      state: null,
      type: "exit"
    }))
]

const getStartTransitions = (startInstanceIds, nodes) =>
  nodes
    .filter(
      ({ state }) =>
        state &&
        state.unlockedBy &&
        startInstanceIds.includes(state.unlockedBy.from.instance.id)
    )
    .map(({ id, instance }) => ({
      from: `${instance.id}-entry`,
      to: id,
      type: TransitionArrow.TRANSFORM_TRANSITION
    }))

const getTransformTransitions = nodes =>
  nodes.flatMap(node =>
    node.state
      ? node.state.state.outgoingTransitions.map(({ to }) => ({
          from: node.id,
          to: nodes.find(
            ({ instance, state, type }) =>
              instance.id === node.instance.id &&
              (to ? state && state.state.id === to.id : type === "exit")
          ).id,
          type: TransitionArrow.TRANSFORM_TRANSITION
        }))
      : []
  )

const getUnlockTransitions = nodes =>
  nodes
    .filter(({ state }) => state && state.outgoingTransitions.length > 0)
    .flatMap(node =>
      node.state.outgoingTransitions.flatMap(({ to, unlocks }) =>
        unlocks.map(unlock => ({
          from: node.id,
          to: to ? to.id : `${node.instance.id}-exit`,
          unlocks: unlock.id,
          type: TransitionArrow.UNLOCK_TRANSITION
        }))
      )
    )

const getEdges = (startInstanceIds, nodes) =>
  [
    ...getStartTransitions(startInstanceIds, nodes),
    ...getTransformTransitions(nodes),
    ...getUnlockTransitions(nodes)
  ].map(({ from, to, unlocks, type }) => ({
    id: [from, to, unlocks, type],
    from,
    to,
    unlocks,
    type
  }))

const findPositions = (nodes, edges) => {
  const nodeIds = nodes.map(({ id }) => id)

  const occupiedPositions = new Set()
  const nodePositions = new Map()
  const todo = new Set(nodeIds)
  const nextUp = new Set()

  const positionIsOccupied = (x, y) => occupiedPositions.has(`${x} ${y}`)

  const positionNode = (nodeId, pos) => {
    nodePositions.set(nodeId, pos)
    occupiedPositions.add(`${pos.x} ${pos.y}`)
    todo.delete(nodeId)

    edges
      .filter(
        ({ from, to, unlocks }) =>
          (from === nodeId && todo.has(to)) ||
          (to === nodeId && todo.has(from)) ||
          (unlocks === nodeId && todo.has(from))
      )
      .forEach(edge => nextUp.add(edge))
  }

  const positionStartNode = nodeId => {
    let p = 0
    while (positionIsOccupied(p, 0)) {
      p++
    }
    positionNode(nodeId, { x: p, y: 0 })
  }

  const positionNextUpNodes = () => {
    while (todo.size > 0) {
      positionStartNode(todo.values().next().value)
      while (nextUp.size > 0) {
        const edge = nextUp.values().next().value
        nextUp.delete(edge)

        if (nodePositions.has(edge.from)) {
          const { x, y } = nodePositions.get(edge.from)

          let p = 0
          while (positionIsOccupied(x + p, y + 1)) {
            p++
          }

          positionNode(edge.to, { x: x + p, y: y + 1 })
        } else {
          const { x, y } =
            edge.type === TransitionArrow.UNLOCK_TRANSITION
              ? nodePositions.get(edge.unlocks)
              : nodePositions.get(edge.to)

          let p = 0
          while (positionIsOccupied(x + p, y - 1)) {
            p++
          }

          positionNode(edge.from, { x: x + p, y: y - 1 })
        }
      }
    }
  }

  positionNextUpNodes()

  return nodePositions
}

const toGrid = nodePositionMap => {
  const nodePositions = {}

  nodePositionMap.forEach(({ x, y }, key) => {
    nodePositions[key] = {
      left: 16 + 7 * 32 * x,
      top: 16 + 4 * 32 * y
    }
  })

  return nodePositions
}

// TODO: Implement real saving
async function saveGame(game) {
  return new Promise(resolve => setTimeout(() => resolve(game), 1000))
}

const useGame = params => {
  const [saveState, setSaveState] = useState({
    isSaving: false,
    isDirty: false,
    lastSaved: null
  })

  const game = useGameData(params)

  const startInstanceIds = getStartInstanceIds(game.instances)
  const nodes = getNodes(startInstanceIds, game.instances)
  const edges = getEdges(startInstanceIds, nodes)
  const nodePositions = toGrid(findPositions(nodes, edges))

  async function save() {
    setSaveState(saveState => ({ ...saveState, isSaving: true }))
    await saveGame(game)
    setSaveState({
      isDirty: false,
      isSaving: false,
      lastSaved: moment()
    })
  }

  return {
    ...saveState,
    save,
    game,
    getNodePosition: nodeId => nodePositions[nodeId] || { x: -200, y: 0 },
    nodes,
    edges
  }
}

export default useGame
