import useGameData from "hooks/useGameData"
import useGameMutations from "hooks/useGameMutations"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
import useSaveState from "hooks/useSaveState"

const useGame = params => {
  const saveState = useSaveState()

  const game = useGameData(params)

  if (!game) {
    return {
      gameExists: false
    }
  }

  const mutations = useGameMutations(saveState.save)
  const graph = useGameGraph(game.instances)
  const graphLayout = useGraphLayout(graph)

  return {
    gameExists: true,
    game,
    ...saveState,
    ...mutations,
    ...graph,
    ...graphLayout
  }
}

export default useGame
