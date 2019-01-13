import React from 'react'
import styled from 'styled-components'
import { darken } from 'utils/colors'

import PhysicalObject from './PhysicalObject'

const Lawn = styled(PhysicalObject.Part)`
  left: 0; top: 0;
  right: 0; bottom: 0;

  background-color: ${props => props.baseColor};

  background-image:
    linear-gradient(85deg, transparent 45%, #0002 45%, #fff2 55%, transparent 55%),
    linear-gradient(95deg, transparent 45%, #fff2 45%, #0002 55%, transparent 55%),
    linear-gradient(85deg, transparent 45%, #fff2 45%, #0002 55%, transparent 55%),
    linear-gradient(95deg, transparent 45%, #0002 45%, #fff2 55%, transparent 55%),
    linear-gradient(85deg, transparent 45%, #0002 45%, #fff2 55%, transparent 55%),
    linear-gradient(95deg, transparent 45%, #fff2 45%, #0002 55%, transparent 55%),
    radial-gradient(
      ellipse 50% 50% at 50% 50%,
      ${props => darken(-.1, props.baseColor)}, transparent
    ),
    radial-gradient(
      ellipse 50% 50% at 50% 50%,
      ${props => darken(.1, props.baseColor)}, transparent
    );

  background-position:
    left -.3em top .4em,
    left 0em top 0em,
    left .7em top .6em,
    left 1em top -.1em,
    left 1.8em top .7em,
    left 2.0em top .1em,
    center,
    center;

  background-size:
    8% 8%,
    8% 8%,
    8% 8%,
    8% 8%,
    8% 8%,
    8% 8%,
    70% 70%,
    60% 60%;
`
Lawn.defaultProps = {
  baseColor: '#6ab13f'
}

const Grass = props => (
  <PhysicalObject width="20em" height="20em">
    <Lawn {...props} z={0} />
  </PhysicalObject>
)

export default Grass

export const objectId = 'grass'
