import React, { createContext } from "react"
import { useGameProvider } from "hooks/useGame"

const GameContext = createContext(null)

export const GameProvider = ({ children, ...otherProps }) => {
  const value = useGameProvider(otherProps)
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
