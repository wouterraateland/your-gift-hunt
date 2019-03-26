import React, { createContext } from "react"
import useTemplates from "hooks/useTemplates"

const TemplatesContext = createContext(null)

export const EntitiesProvider = ({ children }) => {
  const value = useTemplates()
  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  )
}

export default TemplatesContext
