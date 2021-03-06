import React, { memo } from "react"
import { GenericEntity } from "components/Entities"

import useGame from "hooks/useGame"

const getItemPosition = (i, n) => {
  switch (n) {
    case 1:
      return {
        left: `50%`,
        top: `50%`
      }
    case 2:
      return {
        left: `${i === 0 ? 30 : 70}%`,
        top: `${i === 0 ? 30 : 70}%`
      }
    case 3:
      return {
        left: `${i === 0 ? 50 : i === 1 ? 25 : 75}%`,
        top: `${25 + (i > 0) ? 50 : 0}%`
      }
    default:
      return {
        left: `${25 + (i % 2) * 50}%`,
        top: `${25 + (i > 1) ? 50 : 0}%`
      }
  }
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
              rotation={-45}
              {...getItemPosition(i, props.containedEntities.length)}
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
