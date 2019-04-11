import { useCallback } from "react"
import useYGHPlayer from "ygh-player/react-hook"
import useStore, { localStorageStoreCreator } from "./useStore"

const useGameState = gameIdentifier => {
  const yghPlayer = useYGHPlayer("super secret key", gameIdentifier)
  const { read, write } = useStore(
    localStorageStoreCreator({
      name: `${gameIdentifier.creatorSlug}/${gameIdentifier.gameSlug}`
    })
  )

  const pickupEntity = useCallback(entityId =>
    write("inventoryItems", inventoryItems => [
      ...(inventoryItems || []),
      entityId
    ])
  )

  const presentEntities = yghPlayer.gameState.entities
    ? yghPlayer.gameState.entities.filter(({ state }) => state !== null)
    : []

  const getEntitiesByTemplateName = useCallback(
    templateName =>
      presentEntities.filter(({ template: { name } }) => name === templateName),
    [presentEntities]
  )
  const getEntityById = useCallback(
    id => presentEntities.find(entity => entity.id === id),
    [presentEntities]
  )

  const isInInventory = useCallback(
    entity =>
      read("inventoryItems", []).includes(entity.id) &&
      presentEntities.some(({ id }) => id === entity.id)
  )

  if (yghPlayer.isLoading || !yghPlayer.isAuthenticated) {
    return yghPlayer
  }

  return {
    ...yghPlayer,
    pickupEntity,
    entities: presentEntities,
    getEntitiesByTemplateName,
    getEntityById,
    isInInventory
  }
}

export default useGameState
