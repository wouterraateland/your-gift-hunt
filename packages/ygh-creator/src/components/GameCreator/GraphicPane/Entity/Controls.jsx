import React, { useCallback, useRef } from "react"
import styled, { css } from "styled-components"

import { useContext } from "ygh-hooks"
import useEntityFocus from "hooks/useEntityFocus"
import useResizeRotateControls from "hooks/useResizeRotateControls"

import PanZoomContext from "contexts/PanZoomGraphic"

const Container = styled.div.attrs(({ zoom }) => ({
  style: {
    fontSize: `${1 / zoom}em`
  }
}))`
  pointer-events: auto;

  position: absolute;
  top: -0.5em;
  left: -0.5em;
  bottom: -0.5em;
  right: -0.5em;

  opacity: ${props => (props.isVisible ? 1 : 0)};

  &::after {
    content: "";

    pointer-events: none;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;

    border: 0.1em solid ${props => props.theme.color.primary};
  }
`
Container.displayName = "ControlsContainer"

const controlStyles = css`
  pointer-events: auto;

  position: absolute;
  top: ${props => (props.top ? 0 : props.bottom ? 100 : 50)}%;
  left: ${props => (props.left ? 0 : props.right ? 100 : 50)}%;
  z-index: 1001;

  width: 1em;
  height: 1em;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.small};

  background-color: #fff;

  transform: translate(-50%, -50%);
`

const ResizeControl = styled.div`
  ${controlStyles}
  cursor: ${props => (props.horizontal ? "ew-resize" : "ns-resize")};
`
ResizeControl.displayName = "ResizeControl"

const RotateControl = styled.div`
  ${controlStyles}
  cursor: alias;
`
RotateControl.displayName = "RotateControl"

const Controls = ({ entity, parentRotation }) => {
  const ref = useRef(null)
  const { focusedEntityId, focus } = useEntityFocus()
  const { zoom } = useContext(PanZoomContext, 0b100)

  const isVisible = focusedEntityId === entity.id

  const handleClick = useCallback(() => focus(entity.id), [entity.id])

  const { resizeHandlers, rotateHandlers } = useResizeRotateControls(
    entity,
    parentRotation
  )

  return (
    <Container
      ref={ref}
      onClick={handleClick}
      isVisible={isVisible}
      zoom={zoom}
    >
      {isVisible && (
        <>
          <ResizeControl {...resizeHandlers.top} vertical top />
          <ResizeControl {...resizeHandlers.right} horizontal right />
          <ResizeControl {...resizeHandlers.bottom} vertical bottom />
          <ResizeControl {...resizeHandlers.left} horizontal left />
          <RotateControl {...rotateHandlers.topLeft} top left />
          <RotateControl {...rotateHandlers.topRight} top right />
          <RotateControl {...rotateHandlers.bottomRight} bottom right />
          <RotateControl {...rotateHandlers.bottomLeft} bottom left />
        </>
      )}
    </Container>
  )
}

export default Controls
