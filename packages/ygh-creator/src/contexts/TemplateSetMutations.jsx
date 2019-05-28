import React, { createContext } from "react"
import { useTemplateSetMutationsProvider } from "hooks/useTemplateSetMutations"

const TemplateSetMutationsContext = createContext(null)

export const TemplateSetMutationsProvider = ({ children, ...otherProps }) => {
  const value = useTemplateSetMutationsProvider(otherProps)
  return (
    <TemplateSetMutationsContext.Provider value={value}>
      {children}
    </TemplateSetMutationsContext.Provider>
  )
}

export default TemplateSetMutationsContext
