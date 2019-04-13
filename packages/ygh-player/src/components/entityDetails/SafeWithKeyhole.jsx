import React from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import { SafeWithKeyhole } from "your-gift-hunt/entityDetails"

import useGame from "hooks/useGame"

const EnhancedSafeWithKeyhole = ({ entityId, ...props }) => {
  const { getEntityById, pickupEntity } = useGame()
  const entity = getEntityById(entityId)

  const entityBehaviour = useEntityBehaviour(entity, {
    onDrop: gameState =>
      gameState.entities
        .filter(({ isItem, state }) => isItem && state)
        .map(({ id }) => pickupEntity(id))
  })

  return <SafeWithKeyhole {...props} entity={entity} {...entityBehaviour} />
}

export default EnhancedSafeWithKeyhole
