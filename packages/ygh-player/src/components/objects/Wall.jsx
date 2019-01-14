import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const wallPieces = [
  { l: 0, t: 0, w: 3, h: 1 },
  { l: 11, t: 0, w: 19, h: 1 },
  { l: 0, t: 0, w: 1, h: 20 },
  { l: 0, t: 24, w: 1, h: 2 },
  { l: 0, t: 30, w: 1, h: 6 },
  { l: 29, t: 0, w: 1, h: 15 },
  { l: 29, t: 21, w: 1, h: 15 },
  { l: 0, t: 35, w: 10, h: 1 },
  { l: 15, t: 35, w: 15, h: 1 },
  { l: 15, t: 26, w: 1, h: 10 },
]

const DIRECTION = {
  HORIZONTAL: 0,
  VERTICAL: 1,
}

const windows = [
  { l: 0, t: 20, s: 4, d: DIRECTION.VERTICAL, show: true },
  { l: 0, t: 26, s: 4, d: DIRECTION.VERTICAL, show: true },
  { l: 3, t: 0, s: 8, d: DIRECTION.HORIZONTAL, show: true },
  { l: 29, t: 15, s: 6, d: DIRECTION.VERTICAL, show: false },
]

const WallPiece = styled(PhysicalObject.Part).attrs(props => ({
  style: {
    ...props.style,
    left: `${props.l}em`,
    top: `${props.t}em`,
    width: `${props.w}em`,
    height: `${props.h}em`,
  }
}))`
  border-radius: .25em;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: .25em;

    background: #000;
  }
`

const Window = styled(PhysicalObject.Part).attrs(props => ({
  style: {
    ...props.style,
    left: `${props.l}em`,
    top: `${props.t}em`,
    width: `${props.d === DIRECTION.HORIZONTAL ? props.s : .5}em`,
    height: `${props.d === DIRECTION.VERTICAL ? props.s : .5}em`,
    margin: props.d === DIRECTION.VERTICAL
      ? '0 .25em'
      : '.25em 0',
    boxShadow: props.show ? Array(10).fill(0)
      .map((_, i) => `
        ${Math.cos(-(-45 + props.parentAngle + props.angle) * Math.PI / 180) * 0.05 * (i * (i + 9))}em
        ${Math.sin(-(-45 + props.parentAngle + props.angle) * Math.PI / 180) * 0.05 * (i * (i + 9))}em
        ${.2 * i}em ${.1 * i}em`)
      .join(', ') : null
  }
}))`
  color: #faf8d840;
  background: #c5e8f799;
`

const Mailbox = props => (
  <PhysicalObject width={34} height={30} {...props}>
    {windows.map((w, i) => (
      <Window
        key={i}
        {...w}
        z={0}
      />
    ))}
    {wallPieces.map((piece, i) => (
      <WallPiece
        key={i}
        {...piece}
        z={2}
      />
    ))}
  </PhysicalObject>
)

export default Mailbox

export const objectId = 'mailbox'
