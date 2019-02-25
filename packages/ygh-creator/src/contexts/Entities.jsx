import React, { createContext } from "react"
import useEntities from "hooks/useEntities"

const EntitiesContext = createContext(null)

export const EntitiesProvider = ({ children }) => {
  const value = useEntities()
  return (
    <EntitiesContext.Provider value={value}>
      {children}
    </EntitiesContext.Provider>
  )
}

export default EntitiesContext
