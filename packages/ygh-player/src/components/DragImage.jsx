import React, { cloneElement, useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import useDrag from "hooks/useDrag"

const hasDropParent = el =>
  el &&
  (el.getAttribute("can-drop") === "true" || hasDropParent(el.parentElement))

const Container = styled.div.attrs(props => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`
  }
}))`
  pointer-events: none;
  position: fixed;
  z-index: 10;
  transform: translate(-50%, -50%) scale(4);
  opacity: ${props => (props.canDrop ? 1 : 0.5)};

  & * {
    pointer-events: none !important;
  }
`

const DragImage = () => {
  const { dragElement, drop, canDrop, disableDrop } = useDrag()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [element, setElement] = useState(null)

  const updatePosition = useCallback(event => {
    const cursor = event.touches ? event.touches[0] : event
    if (!hasDropParent(event.target)) {
      disableDrop()
    }
    setPosition({ x: cursor.clientX, y: cursor.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("touchmove", updatePosition)
    window.addEventListener("mouseup", drop)
    window.addEventListener("touchend", drop)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("touchmove", updatePosition)
      window.removeEventListener("mouseup", drop)
      window.removeEventListener("touchend", drop)
    }
  }, [])

  useEffect(() => {
    setElement(dragElement ? cloneElement(dragElement) : null)
  }, [dragElement])

  return (
    <Container {...position} canDrop={canDrop}>
      {element}
    </Container>
  )
}

export default DragImage
