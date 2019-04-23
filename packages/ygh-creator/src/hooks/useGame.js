import { useContext } from "react"
import useGameData from "hooks/useGameData"
import useGameMutations from "hooks/useGameMutations"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
import useGameDependencies from "hooks/useGameDependencies"
import useSaveState from "hooks/useSaveState"

import GameContext from "contexts/Game"

export const useGameProvider = variables => {
  const saveState = useSaveState()

  const game = useGameData(variables)

  if (!game) {
    return {
      gameExists: false
    }
  }

  const graph = useGameGraph(game.entities)
  const graphLayout = useGraphLayout(graph)
  const dependencies = useGameDependencies(graph)
  const mutations = useGameMutations(variables, saveState.save, dependencies)

  return {
    gameExists: true,
    game,
    ...saveState,
    ...mutations,
    ...graph,
    ...graphLayout,
    ...dependencies
  }
}

const useGame = () => useContext(GameContext)
export default useGame
