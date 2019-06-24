import React, { useCallback, useEffect, useRef, useState } from "react"
import diff from "deep-diff"

import { getEntityComponent } from "your-gift-hunt/Entities"

import EntityPositionsContext from "contexts/EntityPositions"

import useContext from "hooks/useContext"
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
  const { entities } = useEntities()
  const hasChanged = useRef(false)
  const lastUpdated = useRef(null)

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

  useEffect(
    () => {
      setEntityPositions(getEntityPositions)
      hasChanged.current = false
    },
    [entities]
  )

  const getEntityPosition = entityId => entityPositions[entityId]

  const setEntityPosition = (entityId, position) => {
    const entityPosition = getEntityPosition(entityId)
    const d = diff(position, entityPosition)
    if (!d || d.length === 0) {
      return
    }
    lastUpdated.current = entityId
    hasChanged.current = true

    setEntityPositions(entityPositions => ({
      ...entityPositions,
      [entityId]: clean({ ...entityPosition, ...position })
    }))
  }

  const flush = () => {
    hasChanged.current = false
  }

  return {
    updatedIndex: lastUpdated.current
      ? entities.findIndex(({ id }) => id === lastUpdated.current)
      : null,
    entityPositions,
    getEntityPosition,
    setEntityPosition,
    hasChanged,
    flush
  }
}

export const useEntityPosition = entityId => {
  const { entities } = useEntities()
  const observedBits = 1 << entities.findIndex(({ id }) => id === entityId) % 31
  const { entityPositions, setEntityPosition } = useContext(
    EntityPositionsContext,
    observedBits
  )
  return [
    entityPositions[entityId],
    position => setEntityPosition(entityId, position)
  ]
}

const useEntityPositions = () => React.useContext(EntityPositionsContext)

export default useEntityPositions
