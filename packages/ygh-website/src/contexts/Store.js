import React, { createContext } from "react"
import useStore from "hooks/useStore"

const StoreContext = createContext({})

export const StoreProvider = ({ store, ...rest }) => {
  const value = useStore(store)
  return <StoreContext.Provider value={value} {...rest} />
}

export default StoreContext
