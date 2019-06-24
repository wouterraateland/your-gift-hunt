import { useContext } from "react"

import useGame from "hooks/useGame"

import EntitiesContext from "contexts/Entities"

export const useEntitiesProvider = () => {
  const { gameExists, game } = useGame()

  const entities = gameExists ? game.entities : []
  const rootEntities = entities.filter(({ container }) => container === null)

  const entityMap = entities.reduce(
    (acc, entity) => ({ ...acc, [entity.id]: entity }),
    {}
  )

  const getEntityById = entityId => entityMap[entityId]

  const getContainer = entityId => {
    const entity = entityMap[entityId]
    const container = entity.portals.some(
      ({ entrance }) =>
        entrance && entrance.entity && entityMap[entrance.entity.id].isObject
    )
      ? entity.portals.find(
          ({ entrance }) =>
            entrance &&
            entrance.entity &&
            entityMap[entrance.entity.id].isObject
        ).entrance.entity
      : entity.container
    return container ? entityMap[container.id] : null
  }

  return {
    entities,
    rootEntities,
    getEntityById,
    getContainer
  }
}

const useEntities = () => useContext(EntitiesContext)
export default useEntities
