import React from 'react'
import styled, { css } from 'styled-components'

import _ from 'utils'

import PhysicalObject from './PhysicalObject'

const Safe = styled(PhysicalObject.Part)`
  width: 5em;
  height: 4em;
  border-radius: .25em .25em 0 0;

  background-color: #37474F;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: .25em .25em 0 0;

    box-shadow:
      inset 0 .4em .8em -.2em #fff4,
      inset 0 -.2em .4em -.1em #0004;
  }
`

const Door = styled(PhysicalObject.Part)`
  left: 0; top: 4em;

  width: 5em;
  height: 1em;

  border-radius: 0 0 .25em .25em;

  background-color: #37474F;

  transform-origin: left top;

  ${props => props.isUnlocked && css`
    transform: rotate(45deg);
  `}

  transition: transform .5s ease-in-out;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0 0 .25em .25em;

    box-shadow:
      inset 0 .2em .4em -.1em #fff4,
      inset 0 -.4em .8em -.2em #0004;
  }
`

const Wheel = styled(PhysicalObject.Part)`
  left: 1em;
  top: 1.25em;

  width: 3em;
  height: .25em;
  border-radius: .125em;

  background-color: #37474F;
  background-image:
    radial-gradient(ellipse 30% 20% at 40% 30%, #fffc, transparent);

  &::before {
    width: 100%;
    height: 100%;

    border-radius: .125em;

    box-shadow:
      inset .2em 0 .4em -.1em #0004,
      inset -.2em 0 .4em -.1em #0009;
  }

  &::after {
    content: '';
    position: absolute;
    left: 1.375em;
    top: -.25em;

    width: .25em;
    height: .25em;

    background-color: #37474F;
  }
`

const SafeWithKeyhole = (props) => {
  const isUnlocked = _.hasState('safe-with-keyhole', 'unlocked')(props)

  return (
    <PhysicalObject width={5} height={5} {...props}>
      <Safe z={2} />
      <Door isUnlocked={isUnlocked} z={2} angle={isUnlocked ? 45 : 0}>
        <Wheel z={1.5} />
      </Door>
    </PhysicalObject>
  )
}
SafeWithKeyhole.entityId = 'safe-with-keyhole'

export default SafeWithKeyhole
