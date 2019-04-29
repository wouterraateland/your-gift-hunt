import { useCallback, useContext, useEffect, useMemo } from "react"
import GameContext from "contexts/Game"
import useYGHPlayer from "ygh-player/react-hook"
import useStore, { localStorageStoreCreator } from "hooks/useStore"
import useScreen from "hooks/useScreen"

import Screens from "components/screens"

const containerRelations = [
  { container: "Computer", contained: ["Question", "Input"] },
  { container: "Mailbox", contained: ["Note"] },
  { container: "Camera", contained: ["Code"] },
  { container: "Instruction note", contained: [] }
]

const containerize = entities =>
  containerRelations.reduce((entities, { container, contained }) => {
    const containerEntity = entities.find(
      ({ template }) => template.name === container
    ) || { id: container, template: { name: container } }
    const containedEntities = entities.filter(({ template }) =>
      contained.includes(template.name)
    )
    const ids = (containerEntity.id
      ? [containerEntity, ...containedEntities]
      : containedEntities
    ).map(({ id }) => id)
    return [
      ...entities.filter(({ id }) => !ids.includes(id)),
      { ...containerEntity, containedEntities }
    ]
  }, entities)

export const useGameProvider = gameIdentifier => {
  const { popup } = useScreen()
  const yghPlayer = useYGHPlayer("super secret key", gameIdentifier)
  const config = useMemo(
    () =>
      yghPlayer.playToken
        ? localStorageStoreCreator({ name: yghPlayer.playToken })
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
    ? containerize(
        yghPlayer.gameState.entities.filter(({ state }) => state !== null)
      )
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

  const isLoading = yghPlayer.isLoading || !yghPlayer.isAuthenticated

  useEffect(() => {
    if (!isLoading) {
      popup(Screens.Intro)
    }
  }, [isLoading])

  useEffect(() => {
    if (presentEntities) {
      const plant = presentEntities.find(
        ({ template: { name } }) => name === "Plant pot"
      )
      if (plant && plant.state.name === "grown") {
        setTimeout(() => popup(Screens.Outro), 1000)
      }
    }
  }, [presentEntities])

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
