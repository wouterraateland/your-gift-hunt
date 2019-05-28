import React, { createContext } from "react"
import { useTemplateOptionsProvider } from "hooks/useTemplateOptions"

const TemplateOptionsContext = createContext(null)

export const TemplateOptionsProvider = ({ children, ...otherProps }) => {
  const value = useTemplateOptionsProvider(otherProps)
  return (
    <TemplateOptionsContext.Provider value={value}>
      {children}
    </TemplateOptionsContext.Provider>
  )
}

export default TemplateOptionsContext
