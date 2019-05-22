import { EDGE_TYPES } from "data"
import { useCallback, useContext } from "react"

import GameQueriesContext from "contexts/GameQueries"

import useEntities from "hooks/useEntities"
import useEntityGraph from "hooks/useEntityGraph"

const createLookupFn = (xs, t = x => x.id) => {
  const map = new Map(xs.map(x => [t(x), x]))
  return id => map.get(id)
}

export const useGameQueriesProvider = () => {
  const { entities } = useEntities()
  const { getEntryNode, edges } = useEntityGraph()

  const getEntityById = createLookupFn(entities)
  const getStateById = createLookupFn(entities.flatMap(({ states }) => states))
  const getFieldById = createLookupFn(entities.flatMap(({ fields }) => fields))
  const getPortalById = createLookupFn(
    entities.flatMap(({ portals }) => portals)
  )
  const getEntranceById = createLookupFn(
    entities.flatMap(({ entrances }) => entrances)
  )
  const getEntityByStateId = createLookupFn(
    entities.flatMap(entity =>
      entity.states.map(({ id }) => ({ ...entity, stateId: id }))
    ),
    entity => entity.stateId
  )

  const isUnlockable = useCallback(
    state =>
      edges.some(
        ({ type, to, unlocks }) =>
          (type === EDGE_TYPES.ENTRY && to === state.id) ||
          (type === EDGE_TYPES.UNLOCK && unlocks === state.id)
      ),
    [getEntryNode]
  )

  return {
    getEntityById,
    getStateById,
    getFieldById,
    getPortalById,
    getEntranceById,
    getEntityByStateId,
    isUnlockable
  }
}

const useGameQueries = () => useContext(GameQueriesContext)
export default useGameQueries
