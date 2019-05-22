import React, { createContext } from "react"
import { useSaveStateProvider } from "hooks/useSaveState"

const SaveStateContext = createContext(null)

export const SaveStateProvider = ({ children, ...otherProps }) => {
  const value = useSaveStateProvider(otherProps)
  return (
    <SaveStateContext.Provider value={value}>
      {children}
    </SaveStateContext.Provider>
  )
}

export default SaveStateContext
