import React, { createContext } from "react"
import { useGameMutationsProvider } from "hooks/useGameMutations"

const GameMutationsContext = createContext(null)

export const GameMutationsProvider = ({ children, ...otherProps }) => {
  const value = useGameMutationsProvider(otherProps)
  return (
    <GameMutationsContext.Provider value={value}>
      {children}
    </GameMutationsContext.Provider>
  )
}

export default GameMutationsContext
