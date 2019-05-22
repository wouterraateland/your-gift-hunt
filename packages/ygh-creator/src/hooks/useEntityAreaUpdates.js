import { useCallback, useEffect } from "react"

import useGame from "hooks/useGame"
import useEntities from "hooks/useEntities"
import useEntityAreas from "hooks/useEntityAreas"
import useGameMutations from "hooks/useGameMutations"

const useEntityAreaUpdates = () => {
  const { game } = useGame()
  const { moveEntities } = useGameMutations()
  const { entities } = useEntities()
  const { entityAreas, hasChanged, flush } = useEntityAreas()

  const flushEntityPositions = useCallback(
    () => {
      flush()
      moveEntities(
        game.id,
        entities
          .filter(
            ({ id, graphPosition }) =>
              !graphPosition ||
              entityAreas[id].top !== graphPosition.top ||
              entityAreas[id].left !== graphPosition.left
          )
          .map(({ id }) => ({ id, graphPosition: entityAreas[id] }))
      )
    },
    [game.id, entities, entityAreas, flush, moveEntities]
  )

  useEffect(
    () => {
      if (hasChanged.current) {
        const t = setTimeout(flushEntityPositions, 4000)

        return () => {
          clearTimeout(t)
        }
      }
    },
    [entityAreas, flush]
  )
}

export default useEntityAreaUpdates
