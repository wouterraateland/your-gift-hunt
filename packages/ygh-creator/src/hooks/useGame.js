import { useMemo } from "react"
import useGameData from "hooks/useGameData"
import useGameMutations from "hooks/useGameMutations"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
import useSaveState from "hooks/useSaveState"

const useGame = variables => {
  const saveState = useSaveState()

  const game = useGameData(variables)

  if (!game) {
    return {
      gameExists: false
    }
  }

  const mutations = useGameMutations(variables, saveState.save)
  const graph = useMemo(() => useGameGraph(game.instances), [game.instances])
  const graphLayout = useMemo(() => useGraphLayout(graph), [graph])

  return {
    gameExists: true,
    game,
    startTriggerStateTransition: game.instances.find(
      ({ entity }) => entity.name === "Start trigger"
    ).states[0].outgoingTransitions[0],
    ...saveState,
    ...mutations,
    ...graph,
    ...graphLayout
  }
}

export default useGame
