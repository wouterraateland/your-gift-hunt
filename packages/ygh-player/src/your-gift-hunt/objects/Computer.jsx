import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Screen = styled(PhysicalObject.Part)`
  top: .5em;

  width: 4em;
  height: .5em;

  border-radius: 50% 50% 0 0 / 80% 80% 0 0;

  background: linear-gradient(#ccc, #eee);

  &::before {
    left: 0; top: 0; right: 0; bottom: 0;
    border-radius: 50% 50% 0 0 / 80% 80% 0 0;

    box-shadow: inset 0 .2em .2em -.1em #0004;
  }

  &::after {
    left: 0; top: 100%;

    width: 4em;
    height: 2em;

    background:
      radial-gradient(
        ellipse 50% 100% at 50% 0,
        ${props => props.state === 'on'
          ? '#8ddaeecc' : 'transparent'},
        transparent
      );
  }
`
Screen.displayName = 'Computer.Screen'

const Standard = styled(PhysicalObject.Part)`
  left: 1.25em; top: 0;
  width: 1.5em;
  height: 1.5em;

  border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;

  background: linear-gradient(#ccc, #eee);

  &::before,
  &::after {
    content: '';
    position: absolute;
  }

  &::before {
    left: 0; top: 0; right: 0; bottom: 0;

    border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;

    box-shadow: inset 0 0 .4em #0004;
  }

  &::after {
    left: 0; top: 0; right: 0;

    width: .5em;
    height: .5em;
    margin: auto;
    border-radius: 10% 10% 30% 30% / 10% 10% 80% 80%;

    background: linear-gradient(#ccc, #eee);
  }
`
Standard.displayName = 'Computer.Standard'

const Keyboard = styled(PhysicalObject.Part)`
  bottom: .375em;

  width: 2.3em;
  height: 1em;
  border-radius: .1em;

  background: linear-gradient(#ccc, #eee 10%);

  transform: rotate(15deg);

  &::before,
  &::after {
    right: 100%; bottom: 100%;

    width: .2em;
    border-radius: .05em;

    color: #444;
  }

  &::before {
    height: .15em;

    box-shadow:
      .25em .2em,
      .5em .2em,
      .75em .2em,
      1em .2em,
      1.25em .2em,
      1.5em .2em,
      1.75em .2em,
      2em .2em,
      2.25em .2em;
  }

  &::after {
    height: .2em;

    box-shadow:
      0.25em .95em, 0.25em .7em, 0.25em .45em,
      0.50em .95em, 0.60em .7em, 0.50em .45em,
      0.75em .95em, 0.85em .7em, 0.75em .45em,
      1.00em .95em, 1.10em .7em, 1.00em .45em,
      1.25em .95em, 1.35em .7em, 1.25em .45em,
      1.50em .95em, 1.60em .7em, 1.50em .45em,
      1.75em .95em, 1.85em .7em, 1.75em .45em,
      2.00em .95em, 2.10em .7em, 2.00em .45em,
      2.25em .95em, 2.25em .7em, 2.25em .45em,

      0.35em .7em;
  }
`
Keyboard.displayName = 'Computer.Keyboard'

const Mouse = styled(PhysicalObject.Part)`
  bottom: .5em;
  right: .25em;

  width: .75em;
  height: 1em;

  border-radius: .375em;

  background: #eee;

  transform: rotate(-15deg);

  &::before {
    left: 0; top: 0; right: 0; bottom: 0;

    border-radius: .375em;

    box-shadow: inset 0 -.1em .2em #0004;
  }

  &::after {
    left: .3em;
    top: .25em;

    width: .15em;
    height: .2em;
    border-radius: .5em;

    box-shadow: inset 0 0 .1em #000;

    background: #444;
  }
`
Mouse.displayName = 'Computer.Mouse'

const Computer = props => (
  <PhysicalObject width={4} height={4} {...props}>
    <Keyboard z={.25} angle={15} />
    <Mouse z={.25} angle={-15} />
    <Standard z={1} />
    <Screen z={1} />
  </PhysicalObject>
)

export default Computer

export const objectId = 'computer'
