import React, { memo } from "react"

import useGame from "hooks/useGame"

const withContainedEntities = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const { entities } = useGame()

    const containedEntities = entities.filter(
      ({ container }) =>
        container &&
        props.portals.some(portal => container.id === portal.entrance.entity.id)
    )

    return <WrappedComponent {...props} containedEntities={containedEntities} />
  })
  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps

  return EnhancedComponent
}

export default withContainedEntities
