import React, { createContext } from "react"
import { useEntityDependenciesProvider } from "hooks/useEntityDependencies"

const EntityDependenciesContext = createContext(null)

export const EntityDependenciesProvider = ({ children, ...otherProps }) => {
  const value = useEntityDependenciesProvider(otherProps)
  return (
    <EntityDependenciesContext.Provider value={value}>
      {children}
    </EntityDependenciesContext.Provider>
  )
}

export default EntityDependenciesContext
