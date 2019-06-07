import React, { createContext } from "react"
import { useGameProvider } from "hooks/useGame"

const GameContext = createContext({})

export const GameProvider = ({ children, creatorSlug, gameSlug }) => {
  const value = useGameProvider({ creatorSlug, gameSlug })
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
