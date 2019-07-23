import React, { createContext } from "react"
import useGoogle from "./useGoogle"

const GoogleContext = createContext(null)

export const GoogleProvider = ({ children, ...otherProps }) => {
  const value = useGoogle(otherProps)
  return (
    <GoogleContext.Provider value={value}>{children}</GoogleContext.Provider>
  )
}

export default GoogleContext
