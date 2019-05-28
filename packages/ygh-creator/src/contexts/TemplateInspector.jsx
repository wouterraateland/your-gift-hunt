import React, { createContext } from "react"
import { useTemplateInspectorProvider } from "hooks/useTemplateInspector"

const TemplateInspectorContext = createContext(null)

export const TemplateInspectorProvider = ({ children }) => {
  const value = useTemplateInspectorProvider()
  return (
    <TemplateInspectorContext.Provider value={value}>
      {children}
    </TemplateInspectorContext.Provider>
  )
}

export default TemplateInspectorContext
