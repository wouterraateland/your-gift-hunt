import React, { forwardRef } from 'react'
import styled, { keyframes } from 'styled-components'

import Screen from './Screen'
import Safe from './Safe'

const keyTurn1 = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`
const keyTurn2 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
`

const Keyhole = styled.div`
  position: absolute;
  left: 2em; top: 3em;

  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;

  &,
  &::before {
    box-shadow:
      .2em .2em .4em -.1em #fff4,
      -.2em -.2em .4em -.1em #0004;
    background-color: #111;
  }

  &::before,
  &::after {
    content: '';

    position: absolute;
  }

  &::before {
    left: .4em; top: 1em;

    width: .7em;
    height: 1.5em;
    border-radius: 0 0 .5em .5em;
  }

  &::after {
    left: 50%; top: 50%;

    width: .5em;
    height: 2.4em;

    border-radius: .2em;
    box-shadow:
      inset .1em 0 .2em -.05em #fff6,
      inset -.1em 0 .2em -.05em #0006;

    background-color: #face32;

    transform:
      translate(-50%, -50%)
      rotate(${props => props.unlocked ? 0 : 90}deg);

    animation:
      ${props => props.unlocked ? keyTurn1 : keyTurn2}
      .5s
      ${props => props.unlocked ? 0 : 1}s
      ease-in-out
      forwards;
  }
`

const Wheel = styled.div`
  position: absolute;
  left: 60%; top: 55%;

  width: 10em;
  height: 10em;
  border-radius: 100%;

  box-shadow:
    inset .3em .3em .8em -.1em #fff4,
    inset -.3em -.3em .8em -.1em #0009,
    .3em .3em .8em -.2em #0009;

  background-image:
    radial-gradient(ellipse 50% 50% at 50% 50%, #0000 80%, #774014 80%);

  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0; top: 0;
    right: 0; bottom: 0;

    margin: auto;
    border-radius: 100%;
  }

  &::before {
    width: 2.5em;
    height: 2.5em;

    background: #999;

    box-shadow:
      inset .4em .4em 1.2em -.2em #fff9,
      inset -.4em -.4em 1.2em -.2em #0009,
      .2em .2em .4em -.1em #0009;
  }

  &::after {
    width: 8em;
    height: 8em;

    box-shadow:
      .2em .2em .8em -.1em #fff4,
      -.2em -.2em .8em -.1em #0009,
      inset .4em .4em .8em -.2em #0009;
  }
`

const Bars = styled.div`
  position: absolute;
  left: 1em; top: 1em;
  right: 1em; bottom: 1em;

  border-radius: 100%;

  mask: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #0000 1.25em, #000 1.25em
  );

  background-image:
    linear-gradient(15deg, #0000 47%, #666 47%, #999 51%, #444 53%, #0000 53%),
    linear-gradient(135deg, #0000 47%, #444 47%, #999 49%, #666 53%, #0000 53%),
    linear-gradient(255deg, #0000 47%, #555 47%, #999 50%, #555 53%, #0000 53%);

  transform: rotate(${props => props.unlocked ? 720 : 0}deg);

  transition: transform 1s ${props => props.unlocked ? .5 : 0}s cubic-bezier(.3, 0, .3, 1);
`

const SafeWithKeyholeScreen = forwardRef(({
  isVisible,
  entity,
  onWheelTurn,
}, refs) => {
  const keyhole = refs ? refs.keyhole : null
  const unlocked = entity.state === 'unlocked'

  return (
    <Screen isVisible={isVisible} onClick={close} centerContent>
      <Safe isVisible={isVisible}>
        <Keyhole unlocked={unlocked} ref={keyhole} />
        <Wheel onClick={onWheelTurn}>
          <Bars unlocked={unlocked} />
        </Wheel>
      </Safe>
    </Screen>
  )
})

export default SafeWithKeyholeScreen
