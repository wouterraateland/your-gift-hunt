import React, { createContext } from "react"
import { useGameQueriesProvider } from "hooks/useGameQueries"

const GameQueriesContext = createContext(null)

export const GameQueriesProvider = ({ children, ...otherProps }) => {
  const value = useGameQueriesProvider(otherProps)
  return (
    <GameQueriesContext.Provider value={value}>
      {children}
    </GameQueriesContext.Provider>
  )
}

export default GameQueriesContext
