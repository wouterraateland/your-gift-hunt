import React from "react"
import { SafeWithCode } from "your-gift-hunt/entityDetails"

import useGame from "hooks/useGame"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default ({ entityId, ...props }) => {
  const { getEntityById, pickupEntity } = useGame()
  const entity = getEntityById(entityId)

  const entityBehaviour = useEntityBehaviour(entity, {
    onInput: gameState =>
      gameState.entities
        .filter(({ isItem, state }) => isItem && state)
        .map(({ id }) => pickupEntity(id))
  })
  return <SafeWithCode {...props} entity={entity} {...entityBehaviour} />
}
