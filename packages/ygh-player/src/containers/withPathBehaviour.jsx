import React, { memo } from "react"
import { GenericEntity } from "components/Entities"

import useGame from "hooks/useGame"

const withPathBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const { isInInventory } = useGame()

    return (
      <WrappedComponent {...props}>
        {props.containedEntities.map(containedEntity =>
          isInInventory(containedEntity.id) ? null : (
            <GenericEntity
              key={containedEntity.id}
              {...containedEntity}
              rotation={-90}
              left="65%"
              top="53%"
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

export default withPathBehaviour
