import React, { useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;

  border-radius: ${props => props.theme.borderRadius};

  text-align: center;

  box-shadow: ${props => props.theme.boxShadow.medium};

  background-color: #fff;
`

const Button = styled.button`
  cursor: pointer;
  width: 2em;
  height: 2em;
  padding: 0.5em;
  border: none;

  background-color: transparent;
`

const Display = styled.span`
  display: inline-block;
  width: 4em;
  height: 2em;
  padding: 0.5em;
  border-left: 0.1em solid #0001;
  border-right: 0.1em solid #0001;
`

const ZoomControls = ({ steps, zoom, setZoom }) => {
  const zoomOut = useCallback(
    () =>
      setZoom(steps[Math.max(0, steps.findIndex(step => step >= zoom) - 1)]),
    [steps, zoom]
  )

  const zoomIn = useCallback(
    () => setZoom(steps.find(step => step > zoom) || steps[steps.length - 1]),
    [steps, zoom]
  )

  return (
    <Container>
      <Button onClick={zoomOut}>-</Button>
      <Display>{Math.floor(zoom * 100)}%</Display>
      <Button onClick={zoomIn}>+</Button>
    </Container>
  )
}

export default ZoomControls
