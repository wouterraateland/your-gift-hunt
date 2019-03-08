import useGameData from "hooks/useGameData"
import useGameMutations from "hooks/useGameMutations"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
import useGameDependencies from "hooks/useGameDependencies"
import useSaveState from "hooks/useSaveState"

const maybe = (f, g) => v => (v === null || v === undefined ? f() : g(v))

const useGame = variables => {
  const saveState = useSaveState()

  const game = useGameData(variables)

  if (!game) {
    return {
      gameExists: false
    }
  }

  const graph = useGameGraph(game.instances)
  const graphLayout = useGraphLayout(graph)
  const dependencies = useGameDependencies(graph)
  const mutations = useGameMutations(variables, saveState.save, dependencies)

  return {
    gameExists: true,
    game,
    startTriggerStateTransition: maybe(
      () => null,
      instance => instance.states[0].outgoingTransitions[0]
    )(game.instances.find(({ entity }) => entity.name === "Start trigger")),
    ...saveState,
    ...mutations,
    ...graph,
    ...graphLayout,
    ...dependencies
  }
}

export default useGame
