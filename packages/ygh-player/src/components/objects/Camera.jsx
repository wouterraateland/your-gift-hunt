import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Lens = styled(PhysicalObject.Part)`
  left: 0; top: 0;
  right: 0;

  width: 1.5em;
  height: 1.25em;
  margin: auto;
  border-radius: .125em .125em .25em .25em / .125em .125em 1em 1em;

  transform-origin: center bottom;

  background-color: #263238;
  background-image:
    radial-gradient(ellipse 10% 80% at 30% 10%, rgba(255, 255, 255, .8), transparent),
    radial-gradient(ellipse 40% 100% at 40% 0, rgba(255, 255, 255, .5), transparent);
`

const Body = styled(PhysicalObject.Part)`
  left: 0;
  right: 0; bottom: 0;

  height: 1em;

  border-radius: .375em;

  background-color: #263238;
  background-image:
    linear-gradient(-45deg, rgba(255, 255, 255, .2) 50%, transparent 50%),
    linear-gradient(45deg, rgba(255, 255, 255, .2) 50%, transparent 50%);
  background-size: 20% 100%, 20% 100%;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: .375em;

    box-shadow:
      inset 0 .2em .4em -.1em #fff4,
      inset 0 -.2em .4em -.1em #0004;
  }

  &::after {
    right: .35em;
    bottom: .35em;

    width: .6em;
    height: .3em;
    border-radius: .125em;

    box-shadow:
      inset 0 .1em .2em #fff4,
      inset 0 -.1em .2em #0004;

    background-color: #f44336;
    background-image:
      radial-gradient(
        ellipse 30% 20% at 40% 40%,
        #fff, transparent
      );
  }
`

const Camera = props => (
  <PhysicalObject width={3.5} height={2.25}>
    <Lens {...props} z={.4} />
    <Body {...props} z={.5} />
  </PhysicalObject>
)

export default Camera

export const objectId = 'camera'
