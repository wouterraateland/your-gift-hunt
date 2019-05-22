import React, { createContext } from "react"
import { useEntitiesProvider } from "hooks/useEntities"

const EntitiesContext = createContext(null)

export const EntitiesProvider = ({ children, ...otherProps }) => {
  const value = useEntitiesProvider(otherProps)
  return (
    <EntitiesContext.Provider value={value}>
      {children}
    </EntitiesContext.Provider>
  )
}

export default EntitiesContext
