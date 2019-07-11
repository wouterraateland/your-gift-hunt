import React, { createContext, useContext } from "react"
import useYGHPlayer from "./useYGHPlayer"

export const YGHPlayerContext = createContext(null)

export const YGHPlayerProvider = ({ children, ...otherProps }) => {
  const value = useYGHPlayer(otherProps)
  return (
    <YGHPlayerContext.Provider value={value}>
      {children}
    </YGHPlayerContext.Provider>
  )
}

const useYGHPlayerContext = () => useContext(YGHPlayerContext)

export default useYGHPlayerContext
