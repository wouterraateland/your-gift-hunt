import React, { useCallback } from "react"
import styled, { css } from "styled-components"

import useInspector from "hooks/useInspector"
import useContext from "hooks/useContext"
import useResizeRotateControls from "hooks/useResizeRotateControls"

import PanZoomContext from "contexts/PanZoom"

import { Resize, Rotate } from "your-gift-hunt/icons"

const Container = styled.div.attrs(({ zoom }) => ({
  style: {
    fontSize: `${1 / zoom}em`
  }
}))`
  pointer-events: ${props => (props.isVisible ? "none" : "auto")};

  position: absolute;
  top: -0.5em;
  left: -0.5em;
  bottom: -0.5em;
  right: -0.5em;
  z-index: ${props => (props.isVisible ? 1000 : 0)};

  opacity: ${props => (props.isVisible ? 1 : 0)};

  border: 0.1em solid ${props => props.theme.color.primary};
`
Container.displayName = "ControlsContainer"

const controlStyles = css`
  pointer-events: auto;

  position: absolute;
  top: ${props => (props.top ? 0 : props.bottom ? 100 : 50)}%;
  left: ${props => (props.left ? 0 : props.right ? 100 : 50)}%;

  width: 1em;
  height: 1em;
  padding: 0.2em;

  text-align: center;
  line-height: 1;

  background-color: ${props => props.theme.color.primary};
  color: #fff;
`

const ResizeControl = styled(Resize)`
  ${controlStyles}
  transform: translate(-50%, -50%)
    rotate(${props => (props.horizontal ? 90 : 0)}deg);
`
ResizeControl.displayName = "ResizeControl"

const RotateControl = styled(Rotate)`
  ${controlStyles}
  transform: translate(-50%, -50%)
    rotate(
      ${props =>
        props.top ? (props.left ? -90 : 0) : props.left ? 180 : 90}deg
    );
`
RotateControl.displayName = "RotateControl"

const Controls = ({ entity, parentRotation }) => {
  const { inspectEntity, isOpen, inspectedEntity } = useInspector()
  const { zoom } = useContext(PanZoomContext, 0b100)

  const handleClick = useCallback(() => inspectEntity(entity.id), [entity.id])

  const { resizeHandlers, rotateHandlers } = useResizeRotateControls(
    entity,
    parentRotation
  )

  return (
    <Container
      onClick={handleClick}
      isVisible={isOpen && inspectedEntity === entity.id}
      zoom={zoom}
    >
      <ResizeControl {...resizeHandlers.top} vertical top />
      <ResizeControl {...resizeHandlers.right} horizontal right />
      <ResizeControl {...resizeHandlers.bottom} vertical bottom />
      <ResizeControl {...resizeHandlers.left} horizontal left />
      <RotateControl {...rotateHandlers.topLeft} top left />
      <RotateControl {...rotateHandlers.topRight} top right />
      <RotateControl {...rotateHandlers.bottomRight} bottom right />
      <RotateControl {...rotateHandlers.bottomLeft} bottom left />
    </Container>
  )
}

export default Controls
