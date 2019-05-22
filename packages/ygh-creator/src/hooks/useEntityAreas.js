import _ from "utils"
import { useContext, useEffect, useRef, useState } from "react"

import EntityAreasContext from "contexts/EntityAreas"

import useEntities from "hooks/useEntities"
import useEntityGraph from "hooks/useEntityGraph"

export const useEntityAreasProvider = () => {
  const { entities, getEntityById } = useEntities()
  const { nodes, edges, getNodeById } = useEntityGraph()
  const hasChanged = useRef(false)

  const [entityAreas, setEntityAreas] = useState(
    _.calcEntityAreas(entities, nodes)
  )
  const nodeAreas = _.calcNodeAreas(entities, nodes, edges)

  useEffect(
    () => {
      setEntityAreas(_.calcEntityAreas(entities, nodes))
      hasChanged.current = false
    },
    [entities, nodes]
  )

  const getAbsoluteEntityArea = entity => {
    if (entity.container) {
      const area = entityAreas[entity.id]

      const containerArea = getAbsoluteEntityArea(
        entities.find(({ id }) => id === entity.container.id)
      )

      return area && containerArea
        ? _.completeArea({
            top: area.top + containerArea.top,
            left: area.left + containerArea.left,
            bottom: area.bottom + containerArea.top,
            right: area.right + containerArea.left
          })
        : null
    } else {
      return entityAreas[entity.id]
    }
  }

  const getEntityArea = (entityId, absolute = true) =>
    absolute
      ? getAbsoluteEntityArea(getEntityById(entityId))
      : entityAreas[entityId]

  const getAbsoluteNodeArea = node => {
    if (!node) {
      return null
    }
    const entityArea = getAbsoluteEntityArea(node.entity)
    const area = nodeAreas[node.id]
    return area && entityArea
      ? _.completeArea({
          top: area.top + entityArea.top,
          left: area.left + entityArea.left,
          width: area.width,
          height: area.height
        })
      : null
  }

  const getNodeArea = (nodeId, absolute = true) =>
    absolute ? getAbsoluteNodeArea(getNodeById(nodeId)) : nodeAreas[nodeId]

  const setEntityPosition = (entityId, position) => {
    const entityArea = getEntityArea(entityId)
    if (position.top === entityArea.top && position.left === entityArea.left) {
      return
    }
    hasChanged.current = true

    const mutations = {
      [entityId]: _.completeArea({
        top: position.top - entityArea.top + entityAreas[entityId].top,
        left: position.left - entityArea.left + entityAreas[entityId].left,
        width: entityArea.width,
        height: entityArea.height
      })
    }

    const fitContainer = containerId => {
      const containerArea = mutations[containerId] || entityAreas[containerId]
      const container = getEntityById(containerId)
      const containedAreas = container.containedEntities.map(
        ({ id }) => mutations[id] || entityAreas[id]
      )

      const top = Math.min(...containedAreas.map(({ top }) => top)) - 1
      const left = Math.min(...containedAreas.map(({ left }) => left)) - 1
      const width =
        Math.max(...containedAreas.map(({ right }) => right)) + 1 - left
      const height =
        Math.max(...containedAreas.map(({ bottom }) => bottom)) + 1 - top

      if (
        left !== 0 ||
        top !== 0 ||
        width !== containerArea.width ||
        height !== containerArea.height
      ) {
        mutations[containerId] = _.completeArea({
          top: containerArea.top + top,
          left: containerArea.left + left,
          width,
          height
        })

        if (left !== 0 || top !== 0) {
          container.containedEntities.forEach(({ id }) => {
            const area = mutations[id] || entityAreas[id]
            mutations[id] = _.completeArea({
              top: area.top - top,
              left: area.left - left,
              width: area.width,
              height: area.height
            })
          })
        }
        if (container.container) {
          fitContainer(container.container.id)
        }
      }
    }

    const entity = getEntityById(entityId)
    if (entity.container) {
      fitContainer(entity.container.id)
    }

    setEntityAreas(entityAreas => ({
      ...entityAreas,
      ...mutations
    }))
  }

  const getCompleteArea = () => {
    const areas = entities
      .filter(({ container }) => !container)
      .map(({ id }) => entityAreas[id])

    return _.completeArea(
      areas.length
        ? {
            top: Math.min(...areas.map(({ top }) => top)),
            left: Math.min(...areas.map(({ left }) => left)),
            bottom: Math.max(...areas.map(({ bottom }) => bottom)),
            right: Math.max(...areas.map(({ right }) => right))
          }
        : {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          }
    )
  }

  const flush = () => {
    hasChanged.current = false
  }

  return {
    getNodeArea,
    getEntityArea,
    getCompleteArea,
    nodeAreas,
    entityAreas,
    setEntityPosition,
    hasChanged,
    flush
  }
}

const useEntityAreas = () => useContext(EntityAreasContext)
export default useEntityAreas
