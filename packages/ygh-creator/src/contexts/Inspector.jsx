import React, { createContext } from "react"
import { useInspectorProvider } from "hooks/useInspector"

const InspectorContext = createContext(null)

export const InspectorProvider = ({ children }) => {
  const value = useInspectorProvider()
  return (
    <InspectorContext.Provider value={value}>
      {children}
    </InspectorContext.Provider>
  )
}

export default InspectorContext
