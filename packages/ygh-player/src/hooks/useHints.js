import { useCallback, useContext, useState } from "react"
import HintsContext from "contexts/Hints"
import useGame from "hooks/useGame"

export const useHintsProvider = () => {
  const {
    requestHints,
    gameState: { hints }
  } = useGame()
  const [isVisible, setVisibility] = useState(false)

  const showHints = useCallback(async () => {
    await requestHints()
    setVisibility(true)
  }, [])

  const hideHints = useCallback(() => {
    setVisibility(false)
  }, [])

  return {
    hints,
    isVisible,
    showHints,
    hideHints
  }
}

const useHints = () => useContext(HintsContext)
export default useHints
