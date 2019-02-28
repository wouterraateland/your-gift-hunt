import React, { createContext } from "react"
import useGame from "hooks/useGame"

const GameContext = createContext(null)

export const GameProvider = ({ children, ...otherProps }) => {
  const value = useGame(otherProps)
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
