import { useCallback, useEffect } from "react"
import diff from "deep-diff"

import useGame from "hooks/useGame"
import useEntities from "hooks/useEntities"
import useEntityPositions from "hooks/useEntityPositions"
import useGameMutations from "hooks/useGameMutations"

const useEntityPositionUpdates = () => {
  const { game } = useGame()
  const { updateEntityPositions } = useGameMutations()
  const { entities } = useEntities()
  const { entityPositions, hasChanged, flush } = useEntityPositions()

  const flushEntityPositions = useCallback(() => {
    flush()
    updateEntityPositions(
      game.id,
      entities
        .filter(({ id, physicalPosition }) => {
          const d = diff(physicalPosition, entityPositions[id])
          return !d || d.length > 0
        })
        .map(({ id }) => ({ id, physicalPosition: entityPositions[id] }))
    )
  }, [game ? game.id : null, entities, entityPositions, flush])

  useEffect(() => {
    if (hasChanged.current) {
      const t = setTimeout(flushEntityPositions, 4000)

      return () => {
        clearTimeout(t)
      }
    }
  }, [entityPositions, flush])
}

export default useEntityPositionUpdates
