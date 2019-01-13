import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const CameraPart = styled(PhysicalObject.Part)`
  position: relative;

  width: 1.5em;
  height: 1.25em;
  border-radius: .125em .125em .25em .25em / .125em .125em 1em 1em;

  transform-origin: center bottom;

  background-color: #263238;
  background-image:
    radial-gradient(ellipse 10% 80% at 30% 10%, rgba(255, 255, 255, .8), transparent),
    radial-gradient(ellipse 40% 100% at 40% 0, rgba(255, 255, 255, .5), transparent);

  &::before, &::after {
    content: '';
    position: absolute;
  }

  /* The lens */
  &::before {
    width: 3.5em;
    height: 1em;

    border-radius: .375em;

    background-color: #263238;
    background-image:
      linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, .2) 50%),
      linear-gradient(-45deg, transparent 50%, rgba(255, 255, 255, .2) 50%);
    background-size: 20% 100%, 20% 100%;

    left: -1em;
    top: 1.25em;
  }

  /* The button */
  &::after {
    right: -.625em;
    top: 1.625em;

    width: .5em;
    height: .25em;
    border-radius: .125em;

    box-shadow: .125em .125em .125em -.0625em rgba(0, 0, 0, .2);

    background-color: #f44336;
  }
`

const Camera = props => (
  <PhysicalObject width="3.5em" height="2.25em">
    <CameraPart {...props} z={.5} />
  </PhysicalObject>
)

export default Camera

export const objectId = 'camera'
