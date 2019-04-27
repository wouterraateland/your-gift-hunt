import React, { memo, useCallback } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import useGame from "hooks/useGame"

const withPackageBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const entityBehaviour = useEntityBehaviour(props)

    const { pickupEntity } = useGame()

    const dispatchInputAction = useCallback(() => {
      if (props.containedEntity) {
        pickupEntity(props.containedEntity.id)
      }
    }, [props.containedEntity])

    return (
      <WrappedComponent
        {...props}
        {...entityBehaviour}
        dispatchInputAction={dispatchInputAction}
      />
    )
  })
  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps

  return EnhancedComponent
}

export default withPackageBehaviour
