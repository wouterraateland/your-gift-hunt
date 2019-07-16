import { useContext } from "react"
import PanZoomGraphicContext from "contexts/PanZoomGraphic"

import usePanZoom from "hooks/usePanZoom"

export const usePanZoomGraphicProvider = () =>
  usePanZoom({
    enableZoom: true,
    minZoom: 0.1,
    maxZoom: 2,
    requirePinch: true
  })

export const usePanZoomGraphicContext = () => useContext(PanZoomGraphicContext)
