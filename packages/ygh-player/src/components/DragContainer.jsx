import React, { useContext } from 'react'
import styled from 'styled-components'

import DragContext from 'contexts/Drag'

const StyledDragContainer = styled.div`
  transform: translate(0, 0);
`

const DragContainer = ({ data, ...props }) => {
  const { setDragElement, setData } = useContext(DragContext)

  function handleDragStart() {
    setDragElement(props.children)
    setData(data)
  }

  return (
    <StyledDragContainer
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      {...props}
    />
  )
}

export default DragContainer
