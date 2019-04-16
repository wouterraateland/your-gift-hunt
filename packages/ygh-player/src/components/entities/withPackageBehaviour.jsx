import React, { memo, useCallback, useState } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import useGame from "hooks/useGame"

const withPackageBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const [state, setState] = useState("closed")
    const entityBehaviour = useEntityBehaviour(props)

    const { pickupEntity } = useGame()

    const dispatchInputAction = useCallback(
      (_, key, value) => {
        if (key === "state") {
          setState(value)
          if (value === "empty") {
            pickupEntity(props.containedEntity.id)
          }
        }
      },
      [props.containedEntity.id]
    )

    return (
      <WrappedComponent
        {...props}
        {...entityBehaviour}
        dispatchInputAction={dispatchInputAction}
        state={{ name: state }}
      />
    )
  })
  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps

  return EnhancedComponent
}

export default withPackageBehaviour
