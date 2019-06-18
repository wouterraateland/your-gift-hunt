import React, { useRef } from "react"
import styled from "styled-components"

import { PanZoomProvider } from "contexts/PanZoom"

import usePanZoom from "hooks/usePanZoom" //"use-pan-and-zoom"

import ZoomControls from "./ZoomControls"
// import PanControls from "./PanControls"

const StyledEditorPane = styled.div`
  touch-action: none;
  overflow: hidden;

  flex-grow: 1;

  background-color: #444;
  background-image: radial-gradient(#fff1 8%, transparent 10%);

  will-change: background-size, background-position;
`

const PanContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em;
  transform-origin: left top;

  will-change: transform;
`

const EditorPane = ({ children }) => {
  const container = useRef(null)
  const {
    transform,
    pan: { x, y },
    setPan,
    zoom,
    setZoom,
    panZoomHandlers
  } = usePanZoom({
    container,
    enableZoom: true,
    minZoom: 0.1,
    maxZoom: 2,
    requirePinch: true
  })

  // useEffect(() => {
  //   if (container.current) {
  //     const { centerX, centerY } = getCompleteArea()
  //
  //     setPan({
  //       x: container.current.offsetWidth / 2 - 32 * centerX,
  //       y: container.current.offsetHeight / 2 - 32 * centerY
  //     })
  //   }
  // }, [])

  return (
    <PanZoomProvider pan={{ x, y }} zoom={zoom}>
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
        {/* <PanControls
          container={container}
          zoom={zoom}
          pan={{ x, y }}
          setPan={setPan}
        /> */}
      </StyledEditorPane>
    </PanZoomProvider>
  )
}

export default EditorPane
