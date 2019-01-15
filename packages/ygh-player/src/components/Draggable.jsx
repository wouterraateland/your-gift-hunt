import React from 'react'
import draggable from 'hooks/draggable'

const DragContainer = ({ translation: { x, y }, rotation, scale, ...rest }) => (
  <div
    draggable
    style={{
      transform: `
        translate(${x}px, ${y}px)
        rotate(${rotation * 180 / Math.PI}deg)
        scale(${scale})
      `
    }}
    {...rest}
  />
)

const Draggable = ({
  translates=true,
  rotates=false,
  scales=false,
  children,
  ...rest
}) => {
  const { state, handlers } = draggable(rest)
  const dragState = {
    translation: translates ? state.translation : { x: 0, y: 0 },
    rotation: rotates ? state.rotation : 0,
    scale: scales ? state.scale : 1,
    isDragging: state.isDragging,
  }

  return (
    <DragContainer
      {...handlers}
      {...dragState}
    >
      {children}
    </DragContainer>
  )
}

export default Draggable
