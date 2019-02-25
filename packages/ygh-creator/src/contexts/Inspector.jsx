import React, { createContext } from "react"
import useInspector from "hooks/useInspector"

const InspectorContext = createContext(null)

export const InspectorProvider = ({ children }) => {
  const value = useInspector()
  return (
    <InspectorContext.Provider value={value}>
      {children}
    </InspectorContext.Provider>
  )
}

export default InspectorContext
