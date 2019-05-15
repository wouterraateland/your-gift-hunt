import React, { memo } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"

const withEntityBehaviour = (WrappedComponent, options) => {
  const EnhancedComponent = memo(props => {
    const entityBehaviour = useEntityBehaviour(props, options)
    return <WrappedComponent {...props} {...entityBehaviour} />
  })

  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps
  return EnhancedComponent
}

export default withEntityBehaviour
