import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Safe from "./Safe"
import Keyhole from "./Keyhole"

const Wheel = styled.div`
  position: absolute;
  left: 60%;
  top: 55%;

  width: 10em;
  height: 10em;
  border-radius: 100%;

  box-shadow: inset 0.3em 0.3em 0.8em -0.1em #fff4,
    inset -0.3em -0.3em 0.8em -0.1em #0009, 0.3em 0.3em 0.8em -0.2em #0009;

  background-image: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #0000 80%,
    #774014 80%
  );

  transform: translate(-50%, -50%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    margin: auto;
    border-radius: 100%;
  }

  &::before {
    width: 2.5em;
    height: 2.5em;

    background: #999;

    box-shadow: inset 0.4em 0.4em 1.2em -0.2em #fff9,
      inset -0.4em -0.4em 1.2em -0.2em #0009, 0.2em 0.2em 0.4em -0.1em #0009;
  }

  &::after {
    width: 8em;
    height: 8em;

    box-shadow: 0.2em 0.2em 0.8em -0.1em #fff4, -0.2em -0.2em 0.8em -0.1em #0009,
      inset 0.4em 0.4em 0.8em -0.2em #0009;
  }
`

const Bars = styled.div`
  position: absolute;
  left: 1em;
  top: 1em;
  right: 1em;
  bottom: 1em;

  border-radius: 100%;

  mask: radial-gradient(ellipse 50% 50% at 50% 50%, #0000 1.25em, #000 1.25em);

  background-image: linear-gradient(
      15deg,
      #0000 47%,
      #666 47%,
      #999 51%,
      #444 53%,
      #0000 53%
    ),
    linear-gradient(135deg, #0000 47%, #444 47%, #999 49%, #666 53%, #0000 53%),
    linear-gradient(255deg, #0000 47%, #555 47%, #999 50%, #555 53%, #0000 53%);

  transform: rotate(${props => (props.isUnlocked ? 720 : 0)}deg);

  transition: transform 1s ${props => (props.isUnlocked ? 0.5 : 0)}s
    cubic-bezier(0.3, 0, 0.3, 1);
`

const SafeWithKeyholeFront = forwardRef((props, ref) => {
  const isUnlocked = _.hasState("unlocked")(props)
  return (
    <>
      <Keyhole left={2} top={3} isUnlocked={isUnlocked} ref={ref} />
      <Wheel>
        <Bars isUnlocked={isUnlocked} />
      </Wheel>
    </>
  )
})

const SafeWithKeyhole = forwardRef((props, ref) => (
  <Safe ref={ref} {...props} Front={SafeWithKeyholeFront} />
))
SafeWithKeyhole.name = "SafeWithKeyhole"
SafeWithKeyhole.templateName = "Safe with keyhole"
SafeWithKeyhole.defaultProps = Safe.defaultProps

export default SafeWithKeyhole
