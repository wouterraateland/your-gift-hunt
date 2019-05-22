import React, { createContext } from "react"
import { useEntityAreasProvider } from "hooks/useEntityAreas"

const EntityAreasContext = createContext(null)

export const EntityAreasProvider = ({ children, ...otherProps }) => {
  const value = useEntityAreasProvider(otherProps)
  return (
    <EntityAreasContext.Provider value={value}>
      {children}
    </EntityAreasContext.Provider>
  )
}

export default EntityAreasContext
