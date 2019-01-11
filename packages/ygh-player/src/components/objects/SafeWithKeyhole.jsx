import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Safe = styled(PhysicalObject.Part)`
  left: 0; top: 0;

  width: 5em;
  height: 4em;
  border: .25em solid #263238;
  border-bottom-width: .125em;
  border-radius: .25em .25em 0 0;

  background-color: #37474F;
`

const Door = styled(PhysicalObject.Part)`
  left: 0; top: 4em;

  width: 5em;
  height: 1em;
  border: .25em solid #263238;
  border-top-width: .125em;
  border-radius: 0 0 .25em .25em;

  background-color: #37474F;

  transform-origin: left top;

  ${props => props.state === 'unlocked' && css`
    transform: rotate(45deg);
  `}

  transition: transform .5s ease-in-out;
`

const Wheel = styled(PhysicalObject.Part)`
  left: 1em;
  top: 5.25em;

  width: 3em;
  height: .25em;
  border-radius: .125em;

  background-color: #37474F;

  transform-origin: -1em -1.25em;

  ${props => props.state === 'unlocked' && css`
    transform: rotate(45deg);
  `}

  transition: transform .5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    left: 1.375em;
    top: -.25em;

    width: .25em;
    height: .25em;

    background-color: #37474F;
  }
`

const SafeWithKeyhole = props => (
  <PhysicalObject width="5em" height="5em">
    <Safe {...props} z={2} />
    <Door {...props} z={2} />
    <Wheel {...props} z={1.5} />
  </PhysicalObject>
)

export default SafeWithKeyhole

export const objectId = 'safe-with-keyhole'
