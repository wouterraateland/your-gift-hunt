import React, { memo } from "react"
import { GenericEntity } from "components/Entities"

import useGame from "hooks/useGame"

const entityPositions = {
  "Ugly Shoes": { left: "35%", top: "16%" },
  "Bowling Shoes": { right: 5.5, bottom: 2.5, rotation: 80 },
  "Sport Shoes": { right: 2.5, bottom: 2, rotation: -40 },
  "Sport Pants": { right: "20%", top: "55%" },
  "Sport Shirt": { right: "25%", top: "25%" },
  "Squash Racket": { left: "34%", bottom: 2.5, rotation: 90 }
}

const withPackageBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const { isInInventory } = useGame()

    return (
      <WrappedComponent {...props}>
        {props.containedEntities.map((containedEntity, i) =>
          isInInventory(containedEntity.id) ? null : (
            <GenericEntity
              key={containedEntity.id}
              {...containedEntity}
              {...entityPositions[containedEntity.name]}
            />
          )
        )}
      </WrappedComponent>
    )
  })
  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps

  return EnhancedComponent
}

export default withPackageBehaviour
