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
  [EDGE_TYPES.USE]: 4,
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

  const findUnoccupiedPositionAround = (x, y, algorithm = "state") => {
    let possible
    const xMult = x > 0 ? -1 : 1
    switch (algorithm) {
      case "start":
        for (let dx = 0; dx < 1000; dx++) {
          possible = true
          for (let dy = -3; dy <= 3; dy++) {
            if (positionIsOccupied(x + dx, y + dy)) {
              possible = false
            }
          }
          if (possible) {
            return { x: x + dx, y }
          }
        }
        break
      case "aside-up":
      case "aside-down":
        const yMult = algorithm === "aside-up" ? -1 : 1
        for (let p = 0; p < 10000; p++) {
          if (!positionIsOccupied(x + xMult, y + p * yMult)) {
            return { x: x + xMult, y: y + p * yMult }
          }
          if (!positionIsOccupied(x - xMult, y + p * yMult)) {
            return { x: x - xMult, y: y + p * yMult }
          }
        }
        break
      default:
        for (let p = 0; p < 10000; p++) {
          if (!positionIsOccupied(x + p * xMult, y)) {
            return { x: x + p * xMult, y }
          }
          if (!positionIsOccupied(x - p * xMult, y)) {
            return { x: x - p * xMult, y }
          }
        }
        break
    }
    return { x, y }
  }

  const positionNode = (nodeId, pos) => {
    nodePositions.set(nodeId, pos)

    // const node = nodes.find(({ id}) => nodeId === id)
    // if (node.type)
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

  while (todo.length > 0) {
    positionNode(todo[0].id, findUnoccupiedPositionAround(0, 0, "start"))

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

          positionNode(
            endPoint,
            findUnoccupiedPositionAround(
              x,
              y + 1,
              edge.type === EDGE_TYPES.USE ? "aside-down" : "state"
            )
          )
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

        const node = nodes.find(({ id }) => edge.from === id)

        positionNode(
          edge.from,
          node.type === NODE_TYPES.ENTRY
            ? { x, y: y - 1 }
            : findUnoccupiedPositionAround(
                x,
                y - 1,
                edge.type === EDGE_TYPES.USE ? "aside-up" : "state"
              )
        )
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
