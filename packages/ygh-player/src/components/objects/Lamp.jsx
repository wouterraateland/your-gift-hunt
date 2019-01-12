import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Foot = styled(PhysicalObject.Part)`
  width: 2.5em;
  height: 2.5em;

  border-radius: 100%;

  background:
    radial-gradient(ellipse 50% 50% at 50% 50%, #212121, transparent 25%, transparent 90%, #212121),
    linear-gradient(135deg, transparent, #424242 40%),
    radial-gradient(ellipse 50% 50% at 55% 55%, transparent 80%, #fff 90%, transparent 100%);

  background-color: #424242;
`

const Neck = styled(PhysicalObject.Part)`
  left: 50%; top: 50%;

  width: 5em;
  height: .25em;

  border-radius: .125em;

  background-image:
    radial-gradient(ellipse 30% 20% at 75% 30%, #fff, transparent),
    radial-gradient(ellipse 75% 50% at 75% 50%, transparent, #212121);
  background-color: #424242;

  transform: translate(-.125em, -.125em);
`

const Head = styled(PhysicalObject.Part)`
  left: calc(50% + 5em); top: 50%;

  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;

  background:
    radial-gradient(transparent, #212121);
  background-color: #424242;

  transform: translate(-50%, -50%);
`

const Light = styled(PhysicalObject.Part)`
  pointer-events: none;

  left: calc(50% + 6.25em); top: 50%;
  z-index: -1;

  opacity: ${props => props.state === 'on' ? 1 : 0};

  width: 7.5em;
  height: 7.5em;

  background: radial-gradient(circle closest-side, rgba(249, 220, 141, 0.7) 10%, transparent);

  transform: translate(-50%, -50%);

  transition: opacity .5s ease-out;
`

const Lamp = props => (
  <PhysicalObject width="2.5em" height="2.5em">
    <Light {...props} z={0} />
    <Foot {...props} z={.25} />
    <Head {...props} z={1.25} />
    <Neck {...props} z={1.5} />
  </PhysicalObject>
)

export default Lamp

export const objectId = 'lamp'
