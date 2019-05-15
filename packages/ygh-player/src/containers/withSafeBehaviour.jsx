import React, { memo } from "react"
import { GenericEntity } from "components/Entities"

import useGame from "hooks/useGame"

const withSafeBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const { isInInventory } = useGame()

    return (
      <WrappedComponent {...props}>
        {props.containedEntities.map((containedEntity, i) =>
          isInInventory(containedEntity.id) ? null : (
            <GenericEntity
              key={containedEntity.id}
              {...containedEntity}
              left={8 + i * 3 - (props.containedEntities.length - 1) * 1.5}
              top={14}
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

export default withSafeBehaviour
