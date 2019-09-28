import React, { createContext } from "react"
import { useGameProvider } from "hooks/useGame"

const GameContext = createContext({})

export const GameProvider = ({ children, ...props }) => {
  const value = useGameProvider(props)
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
