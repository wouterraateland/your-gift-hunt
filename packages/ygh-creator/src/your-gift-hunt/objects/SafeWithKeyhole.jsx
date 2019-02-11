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
`

const Wheel = styled(ObjectPart)`
  left: 1em;
  top: 1.25em;

  width: 3em;
  height: 0.25em;
  border-radius: 0.125em;

  background-color: #37474f;
  background-image: radial-gradient(
    ellipse 30% 20% at 40% 30%,
    #fffc,
    transparent
  );

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0.125em;

    box-shadow: inset 0.2em 0 0.4em -0.1em #0004,
      inset -0.2em 0 0.4em -0.1em #0009;
  }

  &::after {
    left: 1.375em;
    top: -0.25em;

    width: 0.25em;
    height: 0.25em;

    background-color: #37474f;
  }
`

const SafeWithKeyhole = ({ state }) => {
  const isUnlocked = state === "unlocked"
  return (
    <>
      <Safe z={2} />
      <Door isUnlocked={isUnlocked} z={2} angle={isUnlocked ? 45 : 0}>
        <Wheel z={1.5} />
      </Door>
    </>
  )
}
SafeWithKeyhole.entityName = "Safe with keyhole"
SafeWithKeyhole.width = 5
SafeWithKeyhole.height = 5

export default SafeWithKeyhole
