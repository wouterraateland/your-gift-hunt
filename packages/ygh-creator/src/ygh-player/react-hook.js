import React, { createContext, useContext } from "react"
import useYGHPlayer from "./useYGHPlayer"
import { createUseAction, createInputAction } from "./actionCreators"
import ACTION_TYPES from "./actionTypes"

const YGHPlayerContext = createContext(null)

const YGHPlayerProvider = ({ children, ...otherProps }) => {
  const value = useYGHPlayer(otherProps)
  return (
    <YGHPlayerContext.Provider value={value}>
      {children}
    </YGHPlayerContext.Provider>
  )
}

const useYGHPlayerContext = () => useContext(YGHPlayerContext)

export default useYGHPlayer

export {
  YGHPlayerContext,
  YGHPlayerProvider,
  useYGHPlayerContext,
  createUseAction,
  createInputAction,
  ACTION_TYPES
}
