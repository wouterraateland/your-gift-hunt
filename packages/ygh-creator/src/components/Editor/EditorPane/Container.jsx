import React, { useRef } from "react"
import styled from "styled-components"
import usePanZoom from "use-pan-and-zoom"

import ZoomControls from "./ZoomControls"

const StyledEditorPane = styled.div`
  overflow: hidden;

  flex-grow: 1;

  background-color: #f5f6fb;
  background-image: radial-gradient(#0001 8%, transparent 10%);
`

const PanContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  transform-origin: left top;
`

const EditorPane = ({ children }) => {
  const container = useRef(null)
  const {
    transform,
    pan: { x, y },
    zoom,
    setZoom,
    panZoomHandlers
  } = usePanZoom({
    container,
    enableZoom: true,
    minZoom: 0.1,
    maxZoom: 2
  })

  return (
    <StyledEditorPane
      ref={container}
      {...panZoomHandlers}
      style={{
        backgroundSize: `${2 * zoom}em ${2 * zoom}em`,
        backgroundPosition: `${x}px ${y}px`
      }}
    >
      <PanContainer style={{ transform }}>{children}</PanContainer>
      <ZoomControls
        steps={[0.1, 0.25, 0.5, 1, 1.5, 2]}
        zoom={zoom}
        setZoom={setZoom}
      />
    </StyledEditorPane>
  )
}

export default EditorPane
