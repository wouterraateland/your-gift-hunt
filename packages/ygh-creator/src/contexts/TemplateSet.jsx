import React, { createContext } from "react"
import { useTemplateSetProvider } from "hooks/useTemplateSet"

const TemplateSetContext = createContext(null)

export const TemplateSetProvider = ({ children, ...otherProps }) => {
  const value = useTemplateSetProvider(otherProps)
  return (
    <TemplateSetContext.Provider value={value}>
      {children}
    </TemplateSetContext.Provider>
  )
}

export default TemplateSetContext
