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

const getNodes = instances =>
  instances.flatMap(({ states, ...instance }) =>
    states.map(state => ({
      id: state.id,
      instance,
      state
    }))
  )

const getTransformTransitions = nodes =>
  nodes.flatMap(node =>
    node.state.state.incomingTransitions.map(({ from }) => ({
      from: nodes.find(
        ({ instance, state: { state } }) =>
          instance.id === node.instance.id && state.id === from.id
      ).id,
      to: node.id,
      type: TransitionArrow.TRANSFORM_TRANSITION
    }))
  )

const getUnlockTransitions = nodes =>
  nodes
    .filter(({ state: { unlockedBy } }) => unlockedBy)
    .map(node => ({
      from: node.state.unlockedBy.from.id,
      to: node.id,
      type: TransitionArrow.UNLOCK_TRANSITION
    }))

const getEdges = nodes =>
  [...getTransformTransitions(nodes), ...getUnlockTransitions(nodes)].map(
    ({ from, to, type }) => ({
      id: [from, to, type],
      from,
      to,
      type
    })
  )

const findPositions = (nodes, edges) => {
  const nodeIds = nodes.map(({ id }) => id)
  const edgeEndpoints = edges.map(({ to }) => to)
  const startNodeIds = nodeIds.filter(id => !edgeEndpoints.includes(id))

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
        ({ from, to }) =>
          (from === nodeId && todo.has(to)) || (to === nodeId && todo.has(from))
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
    while (nextUp.size > 0) {
      const edge = nextUp.values().next().value
      nextUp.delete(edge)

      if (todo.has(edge.to)) {
        const { x, y } = nodePositions.get(edge.from)

        let p = 0
        while (positionIsOccupied(x + p, y + 1)) {
          p++
        }

        positionNode(edge.to, { x: x + p, y: y + 1 })
      } else {
        const { x, y } = nodePositions.get(edge.to)

        let p = 0
        while (positionIsOccupied(x + p, y - 1)) {
          p++
        }

        positionNode(edge.from, { x: x + p, y: y - 1 })
      }
    }
  }

  startNodeIds.forEach(positionStartNode)

  positionNextUpNodes()

  nodes
    .filter(
      node =>
        todo.has(node.id) &&
        node.instance.entity.defaultState &&
        node.instance.entity.defaultState.id === node.state.state.id
    )
    .forEach(({ id }) => positionStartNode(id))

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

  const nodes = getNodes(game.instances)
  const edges = getEdges(nodes)
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
