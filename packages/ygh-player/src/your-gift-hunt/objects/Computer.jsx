import React from "react"
import styled from "styled-components"
import _ from "utils"

import PhysicalObject from "./PhysicalObject"

const Screen = styled(PhysicalObject.Part)`
  top: 0.5em;

  width: 4em;
  height: 0.5em;

  border-radius: 50% 50% 0 0 / 80% 80% 0 0;

  background: linear-gradient(#ccc, #eee);

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 50% 50% 0 0 / 80% 80% 0 0;

    box-shadow: inset 0 0.2em 0.2em -0.1em #0004;
  }

  &::after {
    left: 0;
    top: 100%;

    width: 4em;
    height: 2em;

    background: radial-gradient(
      ellipse 50% 100% at 50% 0,
      ${props => (props.isOn ? "#8ddaeecc" : "transparent")},
      transparent
    );
  }
`
Screen.displayName = "Computer.Screen"

const Standard = styled(PhysicalObject.Part)`
  left: 1.25em;
  top: 0;
  width: 1.5em;
  height: 1.5em;

  border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;

  background: linear-gradient(#ccc, #eee);

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    border-radius: 40% 40% 20% 20% / 80% 80% 20% 20%;

    box-shadow: inset 0 0 0.4em #0004;
  }

  &::after {
    left: 0;
    top: 0;
    right: 0;

    width: 0.5em;
    height: 0.5em;
    margin: auto;
    border-radius: 10% 10% 30% 30% / 10% 10% 80% 80%;

    background: linear-gradient(#ccc, #eee);
  }
`
Standard.displayName = "Computer.Standard"

const Keyboard = styled(PhysicalObject.Part)`
  bottom: 0.375em;

  width: 2.3em;
  height: 1em;
  border-radius: 0.1em;

  background: linear-gradient(#ccc, #eee 10%);

  transform: rotate(15deg);

  &::before,
  &::after {
    right: 100%;
    bottom: 100%;

    width: 0.2em;
    border-radius: 0.05em;

    color: #444;
  }

  &::before {
    height: 0.15em;

    box-shadow: 0.25em 0.2em, 0.5em 0.2em, 0.75em 0.2em, 1em 0.2em, 1.25em 0.2em,
      1.5em 0.2em, 1.75em 0.2em, 2em 0.2em, 2.25em 0.2em;
  }

  &::after {
    height: 0.2em;

    box-shadow: 0.25em 0.95em, 0.25em 0.7em, 0.25em 0.45em, 0.5em 0.95em,
      0.6em 0.7em, 0.5em 0.45em, 0.75em 0.95em, 0.85em 0.7em, 0.75em 0.45em,
      1em 0.95em, 1.1em 0.7em, 1em 0.45em, 1.25em 0.95em, 1.35em 0.7em,
      1.25em 0.45em, 1.5em 0.95em, 1.6em 0.7em, 1.5em 0.45em, 1.75em 0.95em,
      1.85em 0.7em, 1.75em 0.45em, 2em 0.95em, 2.1em 0.7em, 2em 0.45em,
      2.25em 0.95em, 2.25em 0.7em, 2.25em 0.45em, 0.35em 0.7em;
  }
`
Keyboard.displayName = "Computer.Keyboard"

const Mouse = styled(PhysicalObject.Part)`
  bottom: 0.5em;
  right: 0.25em;

  width: 0.75em;
  height: 1em;

  border-radius: 0.375em;

  background: #eee;

  transform: rotate(-15deg);

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    border-radius: 0.375em;

    box-shadow: inset 0 -0.1em 0.2em #0004;
  }

  &::after {
    left: 0.3em;
    top: 0.25em;

    width: 0.15em;
    height: 0.2em;
    border-radius: 0.5em;

    box-shadow: inset 0 0 0.1em #000;

    background: #444;
  }
`
Mouse.displayName = "Computer.Mouse"

const Computer = props => {
  const isOn = _.hasState("on")(props)

  return (
    <PhysicalObject width={4} height={4} {...props}>
      <Keyboard z={0.25} angle={15} />
      <Mouse z={0.25} angle={-15} />
      <Standard z={1} />
      <Screen z={1} isOn={isOn} />
    </PhysicalObject>
  )
}
Computer.entityName = "Computer"

export default Computer
