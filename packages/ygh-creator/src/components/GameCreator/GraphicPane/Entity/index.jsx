import React, { memo } from "react"

import useEntities from "hooks/useEntities"
import { useEntityPosition } from "hooks/useEntityPositions"
import usePhysicalDrag from "hooks/usePhysicalDrag"

import { GenericEntity } from "your-gift-hunt/Entities"
import Controls from "./Controls"

const EntityComponent = memo(
  ({ entity, position, containedEntities, ...otherProps }) => (
    <GenericEntity {...entity} {...position} {...otherProps}>
      <Controls entity={entity} />
      {containedEntities.map(containedEntity => (
        <EntityContainer key={containedEntity.id} entity={containedEntity} />
      ))}
    </GenericEntity>
  ),
  (prevProps, nextProps) =>
    prevProps.entity.id === nextProps.entity.id &&
    prevProps.containedEntities.length === nextProps.containedEntities.length &&
    prevProps.position === nextProps.position
)

const EntityContainer = ({ entity }) => {
  const { entities, getContainer } = useEntities()
  const [position] = useEntityPosition(entity.id)
  const dragProps = usePhysicalDrag(entity)

  const containedEntities = entities.filter(({ isObject, isItem, id }) => {
    const container = getContainer(id)
    return (isObject || isItem) && container && container.id === entity.id
  })

  return (
    <EntityComponent
      entity={entity}
      position={position}
      state={entity.states[0]}
      {...dragProps}
      containedEntities={containedEntities}
    />
  )
}

export default EntityContainer
