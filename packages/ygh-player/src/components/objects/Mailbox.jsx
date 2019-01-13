import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const flagWave = keyframes`
  from { transform: rotate(-10deg); }
  to { transform: rotate(10deg); }
`

const Box = styled(PhysicalObject.Part)`
  background-color: #fa300c;
  background-image:
    radial-gradient(ellipse 35% 10% at 45% 30%,
      #fff9, transparent),
    linear-gradient(#0006, #0002, #0000 40%, #0002, #0006);

  width: 3em;
  height: 2em;
  border-radius: .2em;

  &::before {
    top: -.1em;
    left: 1em;

    width: 1em;
    height: .2em;
    border-radius: .1em 0 0 .1em;

    border: .1em solid #2352e0;
    border-right-color: transparent;

    transform-origin: .1em .1em;

    animation: ${flagWave} 2s ease-in-out infinite alternate;
  }

  &::after {
    left: 1.25em; bottom: -.4em;

    width: .5em;
    height: .5em;
    border-radius: 100%;

    background-color: #b38d5c;
  }
`

const Door = styled(PhysicalObject.Part)`
  left: 2.75em;

  width: .25em;
  height: 2em;
  border-radius: .2em;

  background-color: #981d00;

  transition-property: left, width, border-radius;
  transition-duration: .2s;
  transition-timing-function: ease-out;

  &::before {
    width: 100%;
    height: 100%;

    box-shadow: inset .2em 0 .1em -.1em #0004;
  }

  ${props => props.state === 'open' && css`
    left: 3em;

    width: 1.5em;
    border-radius: .2em 1em 1em .2em;
  `}
`

const Mailbox = props => (
  <PhysicalObject width="3em" height="2em">
    <Box {...props} z={2} />
    <Door {...props} z={2} />
  </PhysicalObject>
)

export default Mailbox

export const objectId = 'mailbox'