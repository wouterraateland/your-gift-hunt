import { useContext } from "react"
import useGame from "hooks/useGame"

import EntitiesContext from "contexts/Entities"

export const useEntitiesProvider = () => {
  const { gameExists, game } = useGame()

  const entities = gameExists ? game.entities : []
  const rootEntities = entities.filter(({ container }) => container === null)

  const getEntityById = entityId => entities.find(({ id }) => id === entityId)

  return {
    entities,
    rootEntities,
    getEntityById
  }
}

const useEntities = () => useContext(EntitiesContext)
export default useEntities
