import React, { createContext } from "react"
import { useEntityGraphProvider } from "hooks/useEntityGraph"

const EntityGraphContext = createContext(null)

export const EntityGraphProvider = ({ children, ...otherProps }) => {
  const value = useEntityGraphProvider(otherProps)
  return (
    <EntityGraphContext.Provider value={value}>
      {children}
    </EntityGraphContext.Provider>
  )
}

export default EntityGraphContext
