import React, { createContext } from "react"
import { usePanZoomEditorProvider } from "hooks/usePanZoomEditor"

const PanZoomEditorContext = createContext(null, (prev, next) =>
  [
    next.transform !== prev.transform,
    next.pan.y !== prev.pan.x || next.pan.y !== prev.pan.y,
    next.zoom !== prev.zoom
  ].reduce((acc, x, i) => (x ? acc + Math.pow(2, i) : acc), 0)
)

export const PanZoomEditorProvider = ({ children, ...otherProps }) => {
  const value = usePanZoomEditorProvider(otherProps)
  return (
    <PanZoomEditorContext.Provider value={value}>
      {children}
    </PanZoomEditorContext.Provider>
  )
}

export default PanZoomEditorContext
