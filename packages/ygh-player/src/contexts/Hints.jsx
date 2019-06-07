import React, { createContext } from "react"
import { useHintsProvider } from "hooks/useHints"

const HintsContext = createContext({})

export const HintsProvider = ({ children }) => {
  const value = useHintsProvider()
  return <HintsContext.Provider value={value}>{children}</HintsContext.Provider>
}

export default HintsContext
