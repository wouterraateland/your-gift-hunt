import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import { HORIZONTAL } from "./constants"

import { useGetSet } from "ygh-hooks"

const DividerContainer = styled.div`
  position: relative;
  z-index: 1;

  flex-shrink: 0;

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

const HorizontalDividerContainer = styled(DividerContainer)`
  cursor: row-resize;
  height: 1px;

  &::before {
    top: -4px;
    left: 0;
    bottom: -4px;
    right: 0;
  }
`

const VerticalDividerContainer = styled(DividerContainer)`
  cursor: col-resize;
  width: 1px;

  &::before {
    top: 0;
    left: -4px;
    bottom: 0;
    right: -4px;
  }
`

const Divider = ({
  containerRef,
  split,
  onChangeStart,
  onChange,
  onChangeEnd
}) => {
  const [getChangeState, setChangeState] = useGetSet(false)

  const start = useCallback(() => {
    setChangeState(true)
    onChangeStart()
  }, [onChangeStart])

  const move = useCallback(
    ({ pageX, pageY }) => {
      if (getChangeState()) {
        const container = containerRef.current
        const rect = container.getClientRects()[0]

        onChange(split === HORIZONTAL ? pageY - rect.y : pageX - rect.x)
      }
    },
    [onChange, split]
  )

  const end = useCallback(() => {
    setChangeState(false)
    onChangeEnd()
  }, [onChangeEnd])

  const onMouseDown = start
  const onMouseMove = move
  const onMouseUp = end

  const onTouchStart = start
  const onTouchMove = useCallback(event => move(event.touches[0]), [
    onChange,
    split
  ])
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
  }, [onChangeStart, onChange, onChangeEnd, split])

  const Container =
    split === HORIZONTAL ? HorizontalDividerContainer : VerticalDividerContainer

  return <Container onMouseDown={onMouseDown} onTouchStart={onTouchStart} />
}

export default Divider
