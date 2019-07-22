import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import { HORIZONTAL } from "./constants"

import { useGetSet } from "ygh-hooks"

const ResizerContainer = styled.div`
  position: relative;
  z-index: 1;

  background-color: #0002;

  &::before {
    content: "";

    position: absolute;

    transition: background-color 0.2s ease-out;
  }

  &:hover::before {
    background-color: #0001;
  }
`

const HorizontalResizerContainer = styled(ResizerContainer)`
  cursor: row-resize;
  height: 1px;

  &::before {
    top: -4px;
    left: 0;
    bottom: -4px;
    right: 0;
  }
`

const VerticalResizerContainer = styled(ResizerContainer)`
  cursor: col-resize;
  width: 1px;

  &::before {
    top: 0;
    left: -4px;
    bottom: 0;
    right: -4px;
  }
`

const Resizer = ({ split, onResizeStart, onResize, onResizeEnd }) => {
  const [getPrevPosition, setPrevPosition] = useGetSet(null)

  const start = useCallback(
    ({ pageX, pageY }) => {
      setPrevPosition({ pageX, pageY })
      onResizeStart()
    },
    [onResizeStart]
  )

  const move = useCallback(
    ({ pageX, pageY }) => {
      const prevPosition = getPrevPosition()
      if (prevPosition) {
        setPrevPosition({ pageX, pageY })
        onResize({
          dx: pageX - prevPosition.pageX,
          dy: pageY - prevPosition.pageY
        })
      }
    },
    [onResize]
  )

  const end = useCallback(() => {
    setPrevPosition(null)
    onResizeEnd()
  }, [onResizeEnd])

  const onMouseDown = start
  const onMouseMove = move
  const onMouseUp = end

  const onTouchStart = useCallback(event => start(event.touches[0]), [])
  const onTouchMove = useCallback(event => move(event.touches[0]), [])
  const onTouchEnd = end

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [onResizeStart, onResize, onResizeEnd])

  const Container =
    split === HORIZONTAL ? HorizontalResizerContainer : VerticalResizerContainer

  return <Container onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
}

export default Resizer
