import { useState, useEffect } from "react"
import useGameData from "hooks/useGameData"
import useGameGraph from "hooks/useGameGraph"
import useGraphLayout from "hooks/useGraphLayout"
import useGameSave from "hooks/useGameSave"

const useGame = params => {
  const [maxNodes, setMaxNodes] = useState(1)

  const game = useGameData(params)
  const graph = useGameGraph(game.instances)
  const graphLayout = useGraphLayout(graph, maxNodes)
  const save = useGameSave(game)

  function handleKeyPress(event) {
    if (event.key === "w") {
      setMaxNodes(maxNodes => maxNodes + 1)
    }
    if (event.key === "s") {
      setMaxNodes(maxNodes => maxNodes - 1)
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress)
    return () => {
      window.removeEventListener("keypress", handleKeyPress)
    }
  }, [])

  return {
    game,
    ...graph,
    ...graphLayout,
    ...save
  }
}

export default useGame
