import { useContext } from "react"
import PanZoomEditorContext from "contexts/PanZoomEditor"

import usePanZoom from "hooks/usePanZoom"

export const usePanZoomEditorProvider = () =>
  usePanZoom({
    enableZoom: true,
    minZoom: 0.1,
    maxZoom: 2,
    requirePinch: true
  })

export const usePanZoomEditorContext = () => useContext(PanZoomEditorContext)
