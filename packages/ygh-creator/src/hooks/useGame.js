import useGameData from "hooks/useGameData"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
import useGameSave from "hooks/useGameSave"

const useGame = params => {
  const game = useGameData(params)
  const graph = useGameGraph(game.instances)
  const graphLayout = useGraphLayout(graph)
  const save = useGameSave(game)

  return {
    game,
    ...graph,
    ...graphLayout,
    ...save
  }
}

export default useGame
