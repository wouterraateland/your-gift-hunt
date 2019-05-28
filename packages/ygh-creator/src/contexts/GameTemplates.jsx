import React, { createContext } from "react"
import { useGameTemplatesProvider } from "hooks/useGameTemplates"

const GameTemplatesContext = createContext(null)

export const GameTemplatesProvider = ({ children }) => {
  const value = useGameTemplatesProvider()
  return (
    <GameTemplatesContext.Provider value={value}>
      {children}
    </GameTemplatesContext.Provider>
  )
}

export default GameTemplatesContext
