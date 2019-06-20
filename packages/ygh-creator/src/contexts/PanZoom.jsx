import React, { createContext } from "react"

const PanZoomContext = createContext(null, (prev, next) =>
  [
    next.transform !== prev.transform,
    next.pan.y !== prev.pan.x || next.pan.y !== prev.pan.y,
    next.zoom !== prev.zoom
  ].reduce((acc, x, i) => (x ? acc + Math.pow(2, i) : acc), 0)
)

export const PanZoomProvider = ({ children, ...otherProps }) => {
  return (
    <PanZoomContext.Provider value={otherProps}>
      {children}
    </PanZoomContext.Provider>
  )
}

export default PanZoomContext
