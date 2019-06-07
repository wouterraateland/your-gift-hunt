import React, { createContext } from "react"
import { useDragProvider } from "hooks/useDrag"

const DragContext = createContext({})

export const DragProvider = ({ children }) => {
  const value = useDragProvider()
  return <DragContext.Provider value={value}>{children}</DragContext.Provider>
}

export default DragContext
