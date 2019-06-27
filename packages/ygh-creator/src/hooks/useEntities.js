import { useCallback, useContext, useMemo } from "react"

import useGame from "hooks/useGame"

import EntitiesContext from "contexts/Entities"

export const useEntitiesProvider = () => {
  const { gameExists, game } = useGame()

  const entities = useMemo(() => (gameExists ? game.entities : []), [
    game.entities
  ])
  const rootEntities = useMemo(
    () => entities.filter(({ container }) => container === null),
    [entities]
  )
  const entityMap = useMemo(
    () =>
      entities.reduce((acc, entity) => ({ ...acc, [entity.id]: entity }), {}),
    [entities]
  )

  const getEntityById = useCallback(entityId => entityMap[entityId], [
    entityMap
  ])

  const getContainer = useCallback(
    entityId => {
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
    },
    [entityMap]
  )

  return {
    entities,
    rootEntities,
    getEntityById,
    getContainer
  }
}

const useEntities = () => useContext(EntitiesContext)
export default useEntities
