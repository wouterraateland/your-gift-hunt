import React, { memo } from "react"

import useEntities from "hooks/useEntities"
import { useEntityPosition } from "hooks/useEntityPositions"
import usePhysicalDrag from "hooks/usePhysicalDrag"

import { GenericEntity } from "ygh-entities"
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

const EntityContainer = ({ entity, parentRotation }) => {
  const { entities, getContainer } = useEntities()
  const [position] = useEntityPosition(entity.id)
  const dragProps = usePhysicalDrag(entity, parentRotation)

  const containedEntities = entities.filter(({ isPlaceable, id }) => {
    const container = getContainer(id)
    return isPlaceable && container && container.id === entity.id
  })

  return entity.isPlaceable ? (
    <EntityComponent
      isInteractive={false}
      entity={entity}
      position={position}
      state={entity.states[0]}
      {...dragProps}
      containedEntities={containedEntities}
    />
  ) : null
}

export default EntityContainer
