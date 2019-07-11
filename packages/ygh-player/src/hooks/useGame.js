import { useCallback, useContext, useEffect, useMemo } from "react"
import GameContext from "contexts/Game"
import { useYGHPlayerContext } from "ygh-sdk"
import { useStore } from "ygh-hooks"
import _ from "ygh-utils"
import useScreen from "hooks/useScreen"

import Screens from "components/screens"

export const useGameProvider = gameIdentifier => {
  const { popup } = useScreen()
  const yghPlayer = useYGHPlayerContext()

  const config = useMemo(
    () =>
      yghPlayer.playToken
        ? _.localStorageStoreCreator({ name: yghPlayer.playToken })
        : {},
    [yghPlayer.playToken]
  )
  const { read, write } = useStore(config)

  const pickupEntity = useCallback(entityId => {
    write("inventoryItems", inventoryItems => [
      ...(inventoryItems || []),
      entityId
    ])
    popup(Screens.ItemPickup, entityId)
  })

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
    entityId =>
      read("inventoryItems", []).includes(entityId) &&
      presentEntities.some(({ id }) => id === entityId)
  )

  const isLoading = yghPlayer.isLoading || !yghPlayer.isAuthenticated

  useEffect(() => {
    if (!isLoading && !yghPlayer.gameState.startedAt) {
      popup(Screens.Intro)
    }
  }, [isLoading, yghPlayer.gameState.startedAt])

  useEffect(() => {
    if (yghPlayer.gameState.finishedAt) {
      setTimeout(() => popup(Screens.Outro), 1000)
    }
  }, [yghPlayer.gameState.finishedAt])

  useEffect(() => {
    yghPlayer.loadGameFromContext(gameIdentifier)
    return () => {
      yghPlayer.unloadGame()
    }
  }, [])

  if (isLoading) {
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

const useGame = () => useContext(GameContext)
export default useGame
