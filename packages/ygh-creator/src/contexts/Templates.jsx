import React, { createContext } from "react"
import { useTemplatesProvider } from "hooks/useTemplates"

const TemplatesContext = createContext(null)

export const EntitiesProvider = ({ children }) => {
  const value = useTemplatesProvider()
  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  )
}

export default TemplatesContext
