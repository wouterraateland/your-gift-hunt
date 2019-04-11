import React, { useCallback, useContext } from "react"
import styled from "styled-components"

import DragContext from "contexts/Drag"

const StyledDragContainer = styled.div`
  transform: translate(0, 0);

  & > * > * {
    pointer-events: none;
  }
`

const DragContainer = ({ data, children }) => {
  const { setDragElement, setData } = useContext(DragContext)

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
