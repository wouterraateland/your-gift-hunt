import React, { memo } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import Screens from "components/screens"

const withCameraBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const entityBehaviour = useEntityBehaviour(props, {
      detailScreen: Screens.Camera
    })
    return <WrappedComponent {...props} {...entityBehaviour} />
  })

  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps
  return EnhancedComponent
}

export default withCameraBehaviour
