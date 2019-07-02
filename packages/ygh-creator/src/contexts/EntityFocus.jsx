import React, { createContext } from "react"
import { useEntityFocusProvider } from "hooks/useEntityFocus"

const EntityFocusContext = createContext(null, (prev, next) =>
  next.focusedEntityId !== prev.focusedEntityId ? 1 : 0
)

export const EntityFocusProvider = ({ children }) => {
  const value = useEntityFocusProvider()
  return (
    <EntityFocusContext.Provider value={value}>
      {children}
    </EntityFocusContext.Provider>
  )
}

export default EntityFocusContext
