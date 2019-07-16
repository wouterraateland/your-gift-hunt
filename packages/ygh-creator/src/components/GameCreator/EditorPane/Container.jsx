import React, { useCallback, useEffect } from "react"
import styled from "styled-components"

import useEntityAreas from "hooks/useEntityAreas"
import { usePanZoomEditorContext } from "hooks/usePanZoomEditor"

import ZoomControls from "./ZoomControls"
import PanControls from "./PanControls"

const StyledEditorPane = styled.div`
  touch-action: none;
  overflow: hidden;

  flex-grow: 1;

  background-color: #f5f6fb;
  background-image: radial-gradient(#0001 8%, transparent 10%);

  will-change: background-size, background-position;
`

const PanContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  transform-origin: left top;

  will-change: transform;
`

let centered = false

const EditorPane = ({ children }) => {
  const { getCompleteArea } = useEntityAreas()
  const {
    container,
    setContainer,
    transform,
    pan: { x, y },
    setPan,
    zoom,
    setZoom,
    panZoomHandlers
  } = usePanZoomEditorContext()

  const center = useCallback(() => {
    const { centerX, centerY } = getCompleteArea()

    setPan({
      x: container.current.offsetWidth / 2 - 32 * centerX,
      y: container.current.offsetHeight / 2 - 32 * centerY
    })
  }, [])

  useEffect(() => {
    if (container.current && !centered) {
      center()
      centered = true
    }
  }, [])

  return (
    <StyledEditorPane
      ref={container => setContainer(container)}
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
      <PanControls
        container={container}
        zoom={zoom}
        pan={{ x, y }}
        setPan={setPan}
      />
    </StyledEditorPane>
  )
}

export default EditorPane
