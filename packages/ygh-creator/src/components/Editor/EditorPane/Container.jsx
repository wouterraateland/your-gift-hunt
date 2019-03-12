import { NODE_TYPES } from "data"
import React, { useContext, useEffect, useRef } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import usePanZoom from "hooks/usePanZoom" //"use-pan-and-zoom"

import ZoomControls from "./ZoomControls"
import PanControls from "./PanControls"

const StyledEditorPane = styled.div`
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

const EditorPane = ({ children }) => {
  const { nodes, getNodePosition } = useContext(GameContext)
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
    maxZoom: 2
  })

  useEffect(() => {
    const ps = nodes
      .filter(({ type }) => type === NODE_TYPES.STATE)
      .map(({ id }) => getNodePosition(id))

    if (container.current && ps.length) {
      const meanX = ps.reduce((acc, p) => acc + p.left + 96, 0) / ps.length
      const meanY = ps.reduce((acc, p) => acc + p.top + 48, 0) / ps.length

      setPan({
        x: container.current.offsetWidth / 2 - meanX,
        y: container.current.offsetHeight / 2 - meanY
      })
    }
  }, [])

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
