import React, { useContext } from "react"
import { SafeWithCode } from "your-gift-hunt/entityDetails"

import GameContext from "contexts/Game"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default ({ entityId, ...props }) => {
  const { getEntityById, pickupEntity } = useContext(GameContext)
  const entity = getEntityById(entityId)

  const entityBehaviour = useEntityBehaviour(entity, {
    onInput: gameState =>
      gameState.entities
        .filter(({ isItem, state }) => isItem && state)
        .map(({ id }) => pickupEntity(id))
  })
  return <SafeWithCode {...props} entity={entity} {...entityBehaviour} />
}
