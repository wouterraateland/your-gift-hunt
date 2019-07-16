import React, { createContext } from "react"
import { usePanZoomGraphicProvider } from "hooks/usePanZoomGraphic"

const PanZoomGraphicContext = createContext(null, (prev, next) =>
  [
    next.transform !== prev.transform,
    next.pan.y !== prev.pan.x || next.pan.y !== prev.pan.y,
    next.zoom !== prev.zoom
  ].reduce((acc, x, i) => (x ? acc + Math.pow(2, i) : acc), 0)
)

export const PanZoomGraphicProvider = ({ children, ...otherProps }) => {
  const value = usePanZoomGraphicProvider(otherProps)
  return (
    <PanZoomGraphicContext.Provider value={value}>
      {children}
    </PanZoomGraphicContext.Provider>
  )
}

export default PanZoomGraphicContext
