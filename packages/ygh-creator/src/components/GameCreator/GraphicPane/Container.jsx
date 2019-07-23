import React from "react"
import styled from "styled-components"

import { usePanZoomGraphicContext } from "hooks/usePanZoomGraphic"

import ZoomControls from "./ZoomControls"
// import PanControls from "./PanControls"

const StyledGraphicPane = styled.div`
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

const GraphicPane = ({ children }) => {
  const {
    setContainer,
    transform,
    pan: { x, y },
    // setPan,
    zoom,
    setZoom,
    panZoomHandlers
  } = usePanZoomGraphicContext()

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
    <StyledGraphicPane
      ref={container => setContainer(container)}
      {...panZoomHandlers}
      style={{
        backgroundSize: `${2 * zoom}em ${2 * zoom}em`,
        backgroundPosition: `${x}px ${y}px`,
        height: "100%"
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
    </StyledGraphicPane>
  )
}

export default GraphicPane
