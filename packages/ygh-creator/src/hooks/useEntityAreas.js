import _ from "utils"
import { NODE_TYPES } from "data"
import { useCallback, useContext, useEffect, useRef } from "react"

import EntityAreasContext from "contexts/EntityAreas"

import useForceUpdate from "hooks/useForceUpdate"
import useGetSet from "hooks/useGetSet"
import useEntities from "hooks/useEntities"
import useEntityGraph from "hooks/useEntityGraph"

const getEntityContainerMap = entities =>
  entities.reduce(
    (map, entity) => ({
      ...map,
      [entity.id]: entity.container ? entity.container.id : null
    }),
    {}
  )

const getEntityStatesMap = entities =>
  entities.reduce(
    (map, entity) => ({
      ...map,
      [entity.id]: entity.states.length
    }),
    {}
  )

export const useEntityAreasProvider = () => {
  const { entities } = useEntities()

  const entityStatesMap = useRef(getEntityStatesMap(entities))
  const entityContainerMap = useRef(getEntityContainerMap(entities))

  const { nodes, edges, getNodeById } = useEntityGraph()
  const forceUpdate = useForceUpdate()
  const hasChanged = useRef(false)

  const [getEntityAreas, setEntityAreas] = useGetSet(
    _.calcEntityAreas(entities, nodes)
  )

  const _getEntityArea = useCallback(entityId => getEntityAreas()[entityId], [])
  const _setEntityArea = useCallback(
    (entityId, area) =>
      setEntityAreas(entityAreas => ({
        ...entityAreas,
        [entityId]: _.completeArea(area)
      })),
    []
  )

  const [getNodeAreas, setNodeAreas] = useGetSet(
    _.calcNodeAreas(entities, nodes, edges)
  )
  const _getNodeArea = useCallback(nodeId => getNodeAreas()[nodeId], [])

  const getAbsoluteEntityArea = entityId => {
    if (!entityId) {
      return _.completeArea({ top: 0, left: 0, width: 0, height: 0 })
    } else if (entityContainerMap.current[entityId]) {
      const area = _getEntityArea(entityId)
      const containerArea = getAbsoluteEntityArea(
        entityContainerMap.current[entityId]
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
      return _getEntityArea(entityId)
    }
  }

  const getEntityArea = (entityId, absolute = true) =>
    absolute ? getAbsoluteEntityArea(entityId) : _getEntityArea(entityId)

  const getAbsoluteNodeArea = node => {
    if (!node) {
      return null
    }
    const entityArea = getAbsoluteEntityArea(node.entity.id)
    const area = _getNodeArea(node.id)
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
    absolute ? getAbsoluteNodeArea(getNodeById(nodeId)) : _getNodeArea(nodeId)

  const fitContainer = containerId => {
    const containerArea = getEntityArea(containerId)
    const containedEntityIds = Object.entries(
      entityContainerMap.current
    ).reduce(
      (acc, [entityId, _containerId]) =>
        containerId === _containerId ? [...acc, entityId] : acc,
      []
    )
    const containedAreas = containedEntityIds.map(_getEntityArea)

    const top = containedAreas.length
      ? Math.min(...containedAreas.map(({ top }) => top)) - 1
      : containerArea.top
    const left = containedAreas.length
      ? Math.min(...containedAreas.map(({ left }) => left)) - 1
      : containerArea.left
    const width = containedAreas.length
      ? Math.max(...containedAreas.map(({ right }) => right)) + 1 - left
      : 4
    const height = containedAreas.length
      ? Math.max(...containedAreas.map(({ bottom }) => bottom)) + 1 - top
      : 4

    if (
      left !== 0 ||
      top !== 0 ||
      width !== containerArea.width ||
      height !== containerArea.height
    ) {
      _setEntityArea(containerId, {
        top: containerArea.top + top,
        left: containerArea.left + left,
        width,
        height
      })

      if (left !== 0 || top !== 0) {
        containedEntityIds.forEach(id => {
          const area = _getEntityArea(id)
          _setEntityArea(id, {
            top: area.top - top,
            left: area.left - left,
            width: area.width,
            height: area.height
          })
        })
      }

      if (entityContainerMap.current[containerId]) {
        fitContainer(entityContainerMap.current[containerId])
      }
    }
  }

  const setEntityPosition = (entityId, position) => {
    const entityArea = getEntityArea(entityId)
    if (position.top === entityArea.top && position.left === entityArea.left) {
      return
    }
    hasChanged.current = true

    _setEntityArea(entityId, {
      top: position.top - entityArea.top + _getEntityArea(entityId).top,
      left: position.left - entityArea.left + _getEntityArea(entityId).left,
      width: entityArea.width,
      height: entityArea.height
    })

    const containerId = entityContainerMap.current[entityId]
    if (containerId) {
      fitContainer(containerId)
    }

    forceUpdate()
  }

  const getCompleteArea = () => {
    const areas = entities
      .filter(
        ({ id }) => !entityContainerMap.current[id] && getEntityAreas()[id]
      )
      .map(({ id }) => getEntityAreas()[id])

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

  useEffect(() => {
    const prevEntityContainerMap = entityContainerMap.current
    entityContainerMap.current = getEntityContainerMap(entities)

    const prevEntityStatesMap = entityStatesMap.current
    entityStatesMap.current = getEntityStatesMap(entities)

    entities.forEach(entity => {
      const entityArea = _getEntityArea(entity.id)
      const prevContainerId = prevEntityContainerMap[entity.id]
      const nextContainerId = entityContainerMap.current[entity.id]

      if (
        !entity.isContainer &&
        entityStatesMap.current[entity.id] !== prevEntityStatesMap[entity.id] &&
        prevEntityStatesMap[entity.id] > 0
      ) {
        setNodeAreas(nodeAreas => ({
          ...nodeAreas,
          ..._.calcEntityNodeAreas(entity, nodes, edges)
        }))

        const hasEntryNode = nodes.some(
          node => node.type === NODE_TYPES.ENTRY && node.entity.id === entity.id
        )
        const hasExitNode = nodes.some(
          node => node.type === NODE_TYPES.EXIT && node.entity.id === entity.id
        )
        const width = _.NON_CONTAINER_WIDTH
        const height =
          2 +
          2 * entity.states.length +
          (hasEntryNode ? 2 : 0) +
          (hasExitNode ? 2 : 0)
        _setEntityArea(entity.id, {
          top: entityArea.top,
          left: entityArea.left,
          width,
          height
        })
      }

      if (nextContainerId !== prevContainerId) {
        if (entityArea) {
          const prevContainerArea = getEntityArea(prevContainerId)
          const nextContainerArea = getEntityArea(nextContainerId)

          _setEntityArea(entity.id, {
            top: entityArea.top + prevContainerArea.top - nextContainerArea.top,
            left:
              entityArea.left + prevContainerArea.left - nextContainerArea.left,
            width: entityArea.width,
            height: entityArea.height
          })

          prevContainerId && fitContainer(prevContainerId)
          nextContainerId && fitContainer(nextContainerId)
        } else {
          setNodeAreas(nodeAreas => ({
            ...nodeAreas,
            ..._.calcEntityNodeAreas(entity, nodes, edges)
          }))

          if (entity.isContainer) {
            _setEntityArea(entity.id, {
              top: 0,
              left: 0,
              width: 4,
              height: 4
            })
          } else {
            const hasEntryNode = nodes.some(
              node =>
                node.type === NODE_TYPES.ENTRY && node.entity.id === entity.id
            )
            const hasExitNode = nodes.some(
              node =>
                node.type === NODE_TYPES.EXIT && node.entity.id === entity.id
            )
            const width = _.NON_CONTAINER_WIDTH
            const height =
              2 +
              2 * entity.states.length +
              (hasEntryNode ? 2 : 0) +
              (hasExitNode ? 2 : 0)
            _setEntityArea(entity.id, { top: 0, left: 0, width, height })
          }
        }

        forceUpdate()
      }
    })
    hasChanged.current = false
  }, [entities, edges, nodes])

  return {
    getNodeArea,
    getEntityArea,
    getCompleteArea,
    nodeAreas: getNodeAreas(),
    entityAreas: getEntityAreas(),
    setEntityPosition,
    hasChanged,
    flush
  }
}

const useEntityAreas = () => useContext(EntityAreasContext)
export default useEntityAreas
