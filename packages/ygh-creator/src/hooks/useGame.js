import { useMemo } from "react"

import useGameData from "hooks/useGameData"
import useGameMutations from "hooks/useGameMutations"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
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

  const mutations = useGameMutations(variables, saveState.save)
  const graph = useMemo(() => useGameGraph(game.instances), [game.instances])
  const graphLayout = useMemo(() => useGraphLayout(graph), [graph])

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
    ...graphLayout
  }
}

export default useGame
