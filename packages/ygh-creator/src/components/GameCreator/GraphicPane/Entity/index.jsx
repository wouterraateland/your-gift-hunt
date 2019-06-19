import React from "react"

import useEntities from "hooks/useEntities"

import { GenericEntity } from "your-gift-hunt/Entities"
import Controls from "./Controls"

const GenericEntityWithContainedEntities = ({ entity }) => {
  const { entities } = useEntities()

  const containedEntities = entities.filter(
    ({ isObject, isItem, container }) =>
      (isObject || isItem) && container && container.id === entity.id
  )

  return (
    <GenericEntity {...entity} state={entity.states[0]}>
      <Controls entity={entity} />
      {containedEntities.map(containedEntity => (
        <GenericEntityWithContainedEntities
          key={containedEntity.id}
          entity={containedEntity}
        />
      ))}
    </GenericEntity>
  )
}

export default GenericEntityWithContainedEntities
