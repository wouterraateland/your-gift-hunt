import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const wallPieces = [
  { l: 0, t: 0, w: 34, h: 1 },
  { l: 0, t: 0, w: 1, h: 30 },
  { l: 33, t: 0, w: 1, h: 30 },
  { l: 0, t: 29, w: 10, h: 1 },
  { l: 15, t: 29, w: 19, h: 1 },
  { l: 15, t: 20, w: 1, h: 10 },
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
  border-radius: .6em .4em .7em .5em / .8em .5em .6em .4em;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: .6em .4em .7em .5em / .8em .5em .6em .4em;

    background: #000;
  }
`

const Mailbox = props => (
  <PhysicalObject width={34} height={30} {...props}>
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
