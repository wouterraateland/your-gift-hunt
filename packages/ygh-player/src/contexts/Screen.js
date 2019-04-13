import React, { createContext } from "react"
import { useScreenProvider } from "hooks/useScreen"

const ScreenContext = createContext({})

export const ScreenProvider = ({ children }) => {
  const value = useScreenProvider()

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  )
}

export default ScreenContext
