import React, { createContext } from "react"
import useGame from "hooks/useGame"

const GameContext = createContext(null)

export const GameProvider = ({ children, ...otherProps }) => {
  const game = useGame(otherProps)
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}

export default GameContext
