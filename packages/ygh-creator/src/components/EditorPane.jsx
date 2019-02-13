import React, { useRef } from "react"
import styled from "styled-components"
import usePanning from "hooks/usePanning"

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
  const { scale, translation, panHandlers } = usePanning({
    zoom: true,
    minZoom: 0.1,
    maxZoom: 1,
    container
  })
  const { x, y } = translation

  return (
    <StyledEditorPane
      ref={container}
      {...panHandlers}
      style={{
        backgroundSize: `${2 * scale}em ${2 * scale}em`,
        backgroundPosition: `${x}px ${y}px`
      }}
    >
      <PanContainer
        style={{ transform: `translate3D(${x}px, ${y}px, 0) scale(${scale})` }}
      >
        {children}
      </PanContainer>
    </StyledEditorPane>
  )
}

export default EditorPane
