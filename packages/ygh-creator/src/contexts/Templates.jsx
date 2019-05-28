import React, { createContext } from "react"
import { useTemplatesProvider } from "hooks/useTemplates"

const TemplatesContext = createContext(null)

export const TemplatesProvider = ({ children, ...otherProps }) => {
  const value = useTemplatesProvider(otherProps)
  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  )
}

export default TemplatesContext
