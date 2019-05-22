import { EDGE_TYPES, NODE_TYPES } from "data"
import { completeArea } from "./areaLogic"

const NON_CONTAINER_WIDTH = 6

export const calcEntityAreas = (entities, nodes) => {
  const entityAreas = []

  const locate = (entity, size) => {
    const position = entity.graphPosition || { left: 0, top: 0 }
    entityAreas[entity.id] = completeArea({
      ...position,
      ...size
    })
  }

  const calcEntityArea = entity => {
    if (entity.isContainer) {
      entity.containedEntities.forEach(({ id }) =>
        calcEntityArea(entities.find(entity => entity.id === id))
      )
      const containedAreas = entity.containedEntities.map(
        ({ id }) => entityAreas[id]
      )

      const width = containedAreas.length
        ? Math.max(...containedAreas.map(({ right }) => right)) -
          Math.min(...containedAreas.map(({ left }) => left)) +
          2
        : 4
      const height = containedAreas.length
        ? Math.max(...containedAreas.map(({ bottom }) => bottom)) -
          Math.min(...containedAreas.map(({ top }) => top)) +
          2
        : 4

      locate(entity, { width, height })
    } else {
      const hasEntryNode = nodes.some(
        node => node.type === NODE_TYPES.ENTRY && node.entity.id === entity.id
      )
      const hasExitNode = nodes.some(
        node => node.type === NODE_TYPES.EXIT && node.entity.id === entity.id
      )
      const width = NON_CONTAINER_WIDTH
      const height =
        2 +
        2 * entity.states.length +
        (hasEntryNode ? 2 : 0) +
        (hasExitNode ? 2 : 0)
      locate(entity, { width, height })
    }
  }

  entities.filter(({ container }) => container === null).forEach(calcEntityArea)

  return entityAreas
}

export const calcNodeAreas = (entities, nodes, edges) => {
  const nodeAreas = {}

  const calcMetaNodeAreas = (nodes, side, edgeType) => {
    if (edgeType) {
      const usedStateIds = []

      nodes.forEach(node => {
        const stateId = edges
          .filter(
            ({ type, from, to }) =>
              type === edgeType &&
              (side === "left" ? from === node.id : to === node.id)
          )
          .map(({ from, to }) => (side === "left" ? to : from))
          .find(stateId => !usedStateIds.includes(stateId))
        usedStateIds.push(stateId)

        nodeAreas[node.id] = completeArea({
          centerX: side === "right" ? NON_CONTAINER_WIDTH : 0,
          centerY: stateId ? nodeAreas[stateId].centerY : 1,
          width: 0.5,
          height: 0.5
        })
      })
    } else {
      nodes.forEach((node, i) => {
        nodeAreas[node.id] = completeArea({
          centerX: side === "right" ? NON_CONTAINER_WIDTH : 0,
          centerY: i + 1,
          width: 0.5,
          height: 0.5
        })
      })
    }
  }

  const calcNodeAreas = entity => {
    const entryNode = nodes.find(
      node => node.type === NODE_TYPES.ENTRY && node.entity.id === entity.id
    )
    if (entryNode) {
      nodeAreas[entryNode.id] = completeArea({
        centerX: NON_CONTAINER_WIDTH / 2,
        centerY: 3,
        width: 0.5,
        height: 0.5
      })
    }

    const exitNode = nodes.find(
      node => node.type === NODE_TYPES.EXIT && node.entity.id === entity.id
    )
    if (exitNode) {
      nodeAreas[exitNode.id] = completeArea({
        centerX: NON_CONTAINER_WIDTH / 2,
        centerY: 3 + entity.states.length * 2 + (entryNode ? 2 : 0),
        width: 1,
        height: 1
      })
    }

    const stateNodes = nodes.filter(
      node => node.type === NODE_TYPES.STATE && node.entity.id === entity.id
    )
    stateNodes.forEach((stateNode, i) => {
      nodeAreas[stateNode.id] = completeArea({
        centerX: NON_CONTAINER_WIDTH / 2,
        centerY: 3 + i * 2 + (entryNode ? 2 : 0),
        width: NON_CONTAINER_WIDTH - 2,
        height: 1
      })
    })

    calcMetaNodeAreas(entity.fields, "left", EDGE_TYPES.FIELD_USAGE)
    calcMetaNodeAreas(
      entity.informationSlots,
      "right",
      EDGE_TYPES.INFO_AVAILABILITY
    )
    calcMetaNodeAreas(entity.entrances, "left")
    calcMetaNodeAreas(entity.portals, "right", EDGE_TYPES.PORTAL_OPENNESS)
  }
  entities.forEach(calcNodeAreas)

  return nodeAreas
}

export default {
  calcEntityAreas,
  calcNodeAreas
}
