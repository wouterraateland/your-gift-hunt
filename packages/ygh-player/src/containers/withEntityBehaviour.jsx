import React, { memo } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"

const withEntityBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const entityBehaviour = useEntityBehaviour(props)
    return <WrappedComponent {...props} {...entityBehaviour} />
  })

  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps
  return EnhancedComponent
}

export default withEntityBehaviour
