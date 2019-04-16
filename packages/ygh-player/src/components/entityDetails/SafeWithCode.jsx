import React from "react"
import EntityDetails from "your-gift-hunt/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import useGame from "hooks/useGame"

const EnhancedSafeWithKeyhole = props => {
  const { pickupEntity } = useGame()

  const entityBehaviour = useEntityBehaviour(props, {
    onDrop: gameState =>
      gameState.entities
        .filter(({ isItem, state }) => isItem && state)
        .map(({ id }) => pickupEntity(id))
  })

  return <EntityDetails.SafeWithKeyhole {...props} {...entityBehaviour} />
}

export default EnhancedSafeWithKeyhole
