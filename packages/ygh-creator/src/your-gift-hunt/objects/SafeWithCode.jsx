import React from "react"
import styled, { css } from "styled-components"

import ObjectPart from "./ObjectPart"

const Safe = styled(ObjectPart)`
  width: 5em;
  height: 4em;
  border-radius: 0.25em 0.25em 0 0;

  background-color: #37474f;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0.25em 0.25em 0 0;

    box-shadow: inset 0 0.4em 0.8em -0.2em #fff4,
      inset 0 -0.2em 0.4em -0.1em #0004;
  }
`

const Door = styled(ObjectPart)`
  left: 0;
  top: 4em;

  width: 5em;
  height: 1em;

  border-radius: 0 0 0.25em 0.25em;

  background-color: #37474f;

  transform-origin: left top;

  ${props =>
    props.isUnlocked &&
    css`
      transform: rotate(45deg);
    `}

  transition: transform .5s ease-in-out;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0 0 0.25em 0.25em;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4,
      inset 0 -0.4em 0.8em -0.2em #0004;
  }

  &::after {
    left: 0.5em;
    top: 100%;

    width: 4em;
    height: 1.5em;

    background: radial-gradient(
      ellipse 50% 90% at 50% 10%,
      ${props => (props.isUnlocked ? "#9e8c" : "#e98c")},
      transparent
    );
  }
`

const SafeWithCode = ({ state }) => {
  const isUnlocked = state === "unlocked"
  return (
    <>
      <Safe z={2} />
      <Door isUnlocked={isUnlocked} z={2} angle={isUnlocked ? 45 : 0} />
    </>
  )
}
SafeWithCode.entityName = "Safe with code"
SafeWithCode.width = 5
SafeWithCode.height = 5

export default SafeWithCode
