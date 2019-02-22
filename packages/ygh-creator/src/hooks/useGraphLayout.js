import PriorityQueue from "tinyqueue"

import { NODE_TYPES, EDGE_TYPES } from "data"

const nodePriority = {
  [NODE_TYPES.ENTRY]: 2,
  [NODE_TYPES.STATE]: 1,
  [NODE_TYPES.EXIT]: 0
}

const edgePriority = {
  [EDGE_TYPES.ENTRY]: 0,
  [EDGE_TYPES.EXIT]: 0,
  [EDGE_TYPES.TRANSFORM]: 1,
  [EDGE_TYPES.USE]: 2,
  [EDGE_TYPES.UNLOCK]: 3
}

const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

const findPositions = (nodes, edges) => {
  const occupiedPositions = new Set()
  const nodePositions = new Map()
  const todo = nodes
    .slice()
    .sort((a, b) => cmp(nodePriority[a.type], nodePriority[b.type]))
  const nextUp = new PriorityQueue([], (a, b) =>
    cmp(edgePriority[a.type], edgePriority[b.type])
  )

  const positionIsOccupied = (x, y) => occupiedPositions.has(`${x} ${y}`)

  const findUnoccupiedPositionAround = (x, y) => {
    for (let p = 0; p < 10000; p++) {
      if (!positionIsOccupied(x + p, y)) {
        return { x: x + p, y }
      }
      if (!positionIsOccupied(x - p, y)) {
        return { x: x - p, y }
      }
    }
    return { x, y }
  }

  const positionNode = (nodeId, pos) => {
    nodePositions.set(nodeId, pos)
    occupiedPositions.add(`${pos.x} ${pos.y}`)

    const todoIndex = todo.findIndex(node => node.id === nodeId)
    if (todoIndex !== -1) {
      todo.splice(todoIndex, 1)
    }

    edges
      .filter(
        ({ from, to, unlocks, type }) =>
          (from === nodeId &&
            !nodePositions.has(type === EDGE_TYPES.UNLOCK ? unlocks : to)) ||
          (!nodePositions.has(from) &&
            (type === EDGE_TYPES.UNLOCK ? unlocks === nodeId : to === nodeId))
      )
      .forEach(edge => nextUp.push(edge))
  }

  const positionStartNode = nodeId => {
    let possible
    for (let x = 0; x < 1000; x++) {
      possible = true
      for (let y = -3; y <= 3; y++) {
        if (positionIsOccupied(x, y)) {
          possible = false
        }
      }
      if (possible) {
        positionNode(nodeId, { x, y: 0 })
        return
      }
    }
  }

  while (todo.length > 0) {
    positionStartNode(todo[0].id)

    while (nextUp.length > 0) {
      const edge = nextUp.pop()

      if (
        nextUp.data.find(
          ({ from, to }) => from === edge.to && to === edge.from
        ) &&
        nodes.find(
          ({ id, state, instance }) =>
            id === edge.to &&
            state &&
            instance.entity.defaultState &&
            state.state.id === instance.entity.defaultState.id
        )
      ) {
        continue
      }

      const isUnlock = edge.type === EDGE_TYPES.UNLOCK
      const endPoint = isUnlock ? edge.unlocks : edge.to

      if (nodePositions.has(edge.from)) {
        if (!nodePositions.has(endPoint)) {
          const { x, y } = nodePositions.get(edge.from)

          positionNode(endPoint, findUnoccupiedPositionAround(x, y + 1))
        }
      } else if (isUnlock) {
        if (nodePositions.has(edge.unlocks)) {
          const { x, y } = nodePositions.get(edge.unlocks)

          positionNode(edge.to, findUnoccupiedPositionAround(x, y))
        } else if (nodePositions.has(edge.to)) {
          const { x, y } = nodePositions.get(edge.to)

          positionNode(edge.unlocks, findUnoccupiedPositionAround(x, y))
        }
      } else {
        const { x, y } = nodePositions.get(edge.to)

        positionNode(edge.from, findUnoccupiedPositionAround(x, y - 1))
      }
    }
  }

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

const useGraphLayout = ({ nodes, edges }) => {
  const nodePositions = toGrid(findPositions(nodes, edges))

  return {
    getNodePosition: nodeId =>
      nodePositions[nodeId] || { left: -1000, top: -1000 }
  }
}

export default useGraphLayout
