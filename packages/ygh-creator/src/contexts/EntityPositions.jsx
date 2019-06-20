import React, { createContext } from "react"
import { useEntityPositionsProvider } from "hooks/useEntityPositions"

const EntityPositionsContext = createContext(null, (prev, next) =>
  next.updatedIndex ? 1 << next.updatedIndex % 31 : 0
)

export const EntityPositionsProvider = ({ children, ...otherProps }) => {
  const value = useEntityPositionsProvider(otherProps)
  return (
    <EntityPositionsContext.Provider value={value}>
      {children}
    </EntityPositionsContext.Provider>
  )
}

export default EntityPositionsContext
