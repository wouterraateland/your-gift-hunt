import React, { createContext } from "react"

const PanZoomContext = createContext(null)

export const PanZoomProvider = ({ children, ...otherProps }) => {
  return (
    <PanZoomContext.Provider value={otherProps}>
      {children}
    </PanZoomContext.Provider>
  )
}

export default PanZoomContext
