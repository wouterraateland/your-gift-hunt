import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Seat = styled(PhysicalObject.Part)`
  width: 4em;
  height: 4em;

  border-radius: 40% 40% 40% 40% / 20% 20% 60% 60%;

  background:
    repeating-linear-gradient(85deg,
      #fff0 0%, #fff0 10%,
      #ffffff08 40%,
      #fff0 40%, #fff0 100%),
    repeating-linear-gradient(93deg,
      #fff0 0%, #fff0 50%,
      #ffffff08 70%,
      #fff0 70%, #fff0 100%),
    repeating-linear-gradient(89deg,
      #fff0 0%, #fff0 80%,
      #ffffff08 100%,
      #fff0 100%, #fff0 100%),
    radial-gradient(#938677, #c77b44);

  background-size: 1em, 1em, 1em, 100%;
  background-position: .3em 0, .5em 0, .2em 0, 0 0;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 40% 40% 40% 40% / 20% 20% 60% 60%;

    box-shadow: inset 0 -.2em .3em #0004;
  }

  &::after {
    z-index: -1;
    bottom: -.5em;

    width: 4em;
    height: 1em;

    background:
      linear-gradient(90deg,
        transparent 1em, #444 1em,
        #999 1.2em, #444 1.5em,
        transparent 1.5em, transparent 2.5em,
        #444 2.5em, #999 2.7em,
        #444 3em, transparent 3em);
  }
`

const Backrest = styled(PhysicalObject.Part)`
  top: 4em;

  width: 4em;
  height: 1em;

  border-radius: .5em .5em 100% 100% / .5em .5em 1.5em 1.5em;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: .5em .5em 100% 100% / .5em .5em 1.5em 1.5em;

    box-shadow: inset 0 -.2em .2em #0004;

    background: #c77b44;
    mask: radial-gradient(
     ellipse 50% 75% at 50% -37.5%,
     #0000 95%, #000);
  }
`

const DeskChair = props => (
  <PhysicalObject width="4em" height="4em">
    <Seat {...props} z={1} />
    <Backrest {...props} z={1.5} />
  </PhysicalObject>
)

export default DeskChair

export const objectId = 'desk-chair'