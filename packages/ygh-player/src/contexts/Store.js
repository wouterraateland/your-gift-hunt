import React, { createContext } from "react"
import { useStoreProvider } from "hooks/useStore"

const StoreContext = createContext({})

export const StoreProvider = ({ store, ...rest }) => {
  const value = useStoreProvider(store)
  return <StoreContext.Provider value={value} {...rest} />
}

export default StoreContext
