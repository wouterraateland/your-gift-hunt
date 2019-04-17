import React, { useCallback } from "react"
import styled from "styled-components"

import useDrag from "hooks/useDrag"

const StyledDragContainer = styled.div`
  transform: translate(0, 0);
  touch-action: none;
  cursor: pointer;

  & > * > * {
    pointer-events: none;
  }
`

const DragContainer = ({ data, children }) => {
  const { setDragElement, setData } = useDrag()

  const handleDragStart = useCallback(() => {
    setDragElement(children)
    setData(data)
  }, [data, children])

  return (
    <StyledDragContainer
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {children}
    </StyledDragContainer>
  )
}

export default DragContainer
