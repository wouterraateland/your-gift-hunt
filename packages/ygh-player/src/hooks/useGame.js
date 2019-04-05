import { useCallback } from "react"
import useYghPlayer from "ygh-player/hook"
import useStore, { localStorageStoreCreator } from "./useStore"

const useGameState = gameIdentifier => {
  const yghPlayer = useYghPlayer(gameIdentifier)
  const { read, write } = useStore(
    localStorageStoreCreator({
      name: `${gameIdentifier.creatorSlug}/${gameIdentifier.gameSlug}`
    })
  )

  const pickupItem = useCallback(entityId =>
    write("inventoryItems", inventoryItems => [
      ...(inventoryItems || []),
      entityId
    ])
  )

  if (yghPlayer.isLoading || !yghPlayer.isAuthenticated) {
    return yghPlayer
  }

  const presentEntities = yghPlayer.gameState.entities.filter(
    ({ state }) => state !== null
  )

  return {
    ...yghPlayer,
    pickupItem,
    entities: {
      all: presentEntities,
      items: presentEntities.filter(entity => entity.isItem),
      inventoryItems: presentEntities.filter(
        entity =>
          entity.isItem && read("inventoryItems", []).includes(entity.id)
      ),
      nonInventoryItems: presentEntities.filter(
        entity =>
          entity.isItem && !read("inventoryItems", []).includes(entity.id)
      ),
      objects: presentEntities.filter(entity => entity.isObject),
      triggers: presentEntities.filter(entity => entity.isTrigger),
      questions: presentEntities.filter(
        entity => entity.template.name === "Question"
      ),
      codes: presentEntities.filter(entity => entity.template.name === "Code"),
      inputs: presentEntities.filter(
        entity => entity.template.name === "Input"
      ),
      notes: presentEntities.filter(entity => entity.template.name === "Note")
    }
  }
}

export default useGameState
