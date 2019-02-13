import React, { useRef } from "react"
import styled from "styled-components"
import usePanZoom from "use-pan-and-zoom"

const StyledEditorPane = styled.div`
  overflow: hidden;

  flex-grow: 1;

  background-color: #f5f6fb;
  background-image: repeating-linear-gradient(
      transparent 0%,
      transparent 48%,
      #0001 48%,
      #0001 52%,
      transparent 52%,
      transparent 100%
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0%,
      transparent 48%,
      #0001 48%,
      #0001 52%,
      transparent 52%,
      transparent 100%
    );
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
    panZoomHandlers
  } = usePanZoom({
    container,
    enableZoom: true,
    minZoom: 0.1,
    maxZoom: 1
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
    </StyledEditorPane>
  )
}

export default EditorPane
