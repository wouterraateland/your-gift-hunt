import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Frame = styled(PhysicalObject.Part)`
  width: 100%;
  height: 100%;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 60% 40% 50% 80% / .15em .1em .15em .1em;

    box-shadow:
      inset 0 .2em .4em -.1em #fff4,
      inset 0 -.2em .4em -.1em #0004;

    background: #859756; /* #856a46; */
  }

  &::after {
    left: -.5em; top: -.25em;
    bottom: -.25em;

    width: .5em;
    border-radius: .2em .1em .1em .1em / .3em .2em .1em .5em;

    box-shadow: 5.5em 0 #000;

    background: #000;
  }
`

const DoorPart = styled(PhysicalObject.Part)`
  top: .25em;
  bottom: .25em;
  width: 100%;
  height: .5em;
  margin: auto;
  border-radius: 60% 40% .2em 80% / .2em .2em .3em .1em;

  background: #584630;

  transform-origin: left bottom;
  transform: rotate(${props => props.state === 'open' ? 60 : 0}deg);

  transition: transform 1s ease-in-out;

  &::before {
    left: 0; bottom: 0;

    width: .5em;
    height: .5em;
    border-radius: 100% 90% 90% 110%;

    background: #000;

    transform: translate(-50%, 50%) rotate(344deg);
  }
`

const Door = props => (
  <PhysicalObject width={5} height={1} {...props}>
    <Frame z={0} />
    <DoorPart z={2} />
  </PhysicalObject>
)
Door.entityId = 'door'

export default Door
