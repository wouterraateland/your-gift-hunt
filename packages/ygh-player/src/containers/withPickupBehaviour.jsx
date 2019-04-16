import React, { memo } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import useGame from "hooks/useGame"

const withPickupBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const { pickupEntity } = useGame()

    const entityBehaviour = useEntityBehaviour(props, {
      onDrop: gameState =>
        gameState.entities
          .filter(({ isItem, state }) => isItem && state)
          .map(({ id }) => pickupEntity(id))
    })

    return <WrappedComponent {...props} {...entityBehaviour} />
  })
  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps

  return EnhancedComponent
}

export default withPickupBehaviour
