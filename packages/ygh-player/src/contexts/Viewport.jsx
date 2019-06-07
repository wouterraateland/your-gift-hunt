import React, { createContext } from "react"
import { useViewportProvider } from "hooks/useViewport"

const ViewportContext = createContext({})

export const ViewportProvider = ({ store, ...otherProps }) => {
  const value = useViewportProvider(store)
  return <ViewportContext.Provider value={value} {...otherProps} />
}

export default ViewportContext
