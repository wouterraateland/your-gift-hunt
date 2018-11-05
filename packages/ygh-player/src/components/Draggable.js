import React from 'react'
import { css } from 'styled-components'
import draggable from 'hooks/draggable'

const DragContainer = ({ translation: { x, y }, rotation, scale, isDragging, ...rest }) => (
  <div
    draggable
    style={{
      willChange: 'transform, z-index',
      touchAction: 'none',
      position: 'absolute',
      transform: `
        translate(-50%, -50%)
        translate(${x}vw, ${y}vh)
        rotate(${rotation * 180 / Math.PI}deg)
        scale(${scale})
      `,
      zIndex: isDragging ? 1 : 0,
    }}
    {...rest}
  />
)

const Draggable = ({
  translates=true,
  rotates=false,
  scales=false,
  component:Component,
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
      <Component isDragging={dragState.isDragging} />
    </DragContainer>
  )
}

export default Draggable

export const dragStyles = h => props => css`
  &, &::before {
    will-change: transform, opacity, box-shadow;

    transition:
      transform .2s ease-out,
      box-shadow .2s ease-out,
      opacity .2s ease-out;
  }

  ${props.isDragging
    ? css`
      transform: scale(1.1);
      opacity: .5;
      &, &::before {
        box-shadow: ${h + 2}vw ${h + 2}vw ${h + 3}vw ${-h / 2}vw rgba(0, 0, 0, ${.2 + h / 2});
      }
    `
    : css`
      &, &::before {
        box-shadow: ${h}vw ${h}vw ${h}vw ${-h / 2}vw rgba(0, 0, 0, ${h / 2});
      }
    `
  }
`
