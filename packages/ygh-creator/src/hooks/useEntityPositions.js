import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { getEntityComponent } from "ygh-entities"

import EntityPositionsContext from "contexts/EntityPositions"

import { useContext } from "ygh-hooks"
import useEntities from "hooks/useEntities"

const clean = o =>
  Object.keys(o).reduce(
    (acc, key) =>
      ["id", "__typename"].includes(key) || o[key] === null
        ? acc
        : { ...acc, [key]: o[key] },
    {}
  )

const getDefaultProps = entity => {
  const component = getEntityComponent(entity.template.name)
  return component
    ? {
        width: component.defaultProps.width,
        height: component.defaultProps.height,
        z: component.defaultProps.z
      }
    : {
        width: 4,
        height: 4,
        z: 0
      }
}

export const useEntityPositionsProvider = () => {
  const { getContainer, entities } = useEntities()
  const hasChanged = useRef(false)
  const lastUpdated = useRef([])

  const getEntityPositions = useCallback(
    () =>
      entities.reduce(
        (acc, entity) => ({
          ...acc,
          [entity.id]: clean({
            ...getDefaultProps(entity),
            ...clean(
              entity.physicalPosition || {
                left: 0,
                top: 0,
                rotation: 0
              }
            )
          })
        }),
        {}
      ),
    [entities]
  )

  const [entityPositions, setEntityPositions] = useState(getEntityPositions)

  useEffect(() => {
    setEntityPositions(getEntityPositions)
    hasChanged.current = false
  }, [entities])

  const getEntityPosition = useCallback(entityId => entityPositions[entityId], [
    entityPositions
  ])

  const getAbsoluteEntityPosition = useCallback(
    entityId => {
      const position = entityPositions[entityId]
      const container = getContainer(entityId)
      const containerPosition = container
        ? getAbsoluteEntityPosition(container.id)
        : { width: 0, height: 0, z: 0, left: 0, top: 0, rotation: 0 }

      const cos = Math.cos((containerPosition.rotation * Math.PI) / 180)
      const sin = Math.sin((containerPosition.rotation * Math.PI) / 180)

      const dy = position.top - containerPosition.height / 2
      const dx = position.left - containerPosition.width / 2

      return {
        ...position,
        top: containerPosition.top + dy * cos + dx * sin,
        left: containerPosition.left + dx * cos - dy * sin,
        rotation: position.rotation + containerPosition.rotation
      }
    },
    [entities, entityPositions]
  )

  const setEntityPosition = useCallback((entityId, position) => {
    lastUpdated.current = [entityId]
    hasChanged.current = true

    setEntityPositions(entityPositions => ({
      ...entityPositions,
      [entityId]: clean(
        typeof position === "function"
          ? position(entityPositions[entityId])
          : { ...entityPositions[entityId], ...position }
      )
    }))
  }, [])

  const setManyEntityPositions = useCallback(updates => {
    lastUpdated.current = updates.map(({ entityId }) => entityId)
    hasChanged.current = true

    setEntityPositions(entityPositions =>
      updates.reduce(
        (acc, { entityId, position }) => ({
          ...acc,
          [entityId]: clean(
            typeof position === "function"
              ? position(acc[entityId])
              : { ...acc[entityId], ...position }
          )
        }),
        entityPositions
      )
    )
  }, [])

  const flush = useCallback(() => {
    hasChanged.current = false
  }, [])

  return {
    updatedIndices: lastUpdated.current.map(
      entityId => entities.findIndex(({ id }) => id === entityId) + 1
    ),
    entityPositions,
    getEntityPosition,
    getAbsoluteEntityPosition,
    setEntityPosition,
    setManyEntityPositions,
    hasChanged,
    flush
  }
}

export const useEntityPosition = entityId => {
  const { entities } = useEntities()
  const observedBits = useMemo(
    () => 1 << (entities.findIndex(({ id }) => id === entityId) + 1) % 31,
    [entityId, entities]
  )

  const { entityPositions, setEntityPosition } = useContext(
    EntityPositionsContext,
    observedBits
  )

  const _setEntityPosition = useCallback(
    position => setEntityPosition(entityId, position),
    [setEntityPosition, entityId]
  )

  return [entityPositions[entityId], _setEntityPosition]
}

const useEntityPositions = () => React.useContext(EntityPositionsContext)

export default useEntityPositions
