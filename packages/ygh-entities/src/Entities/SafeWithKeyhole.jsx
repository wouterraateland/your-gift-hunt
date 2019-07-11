import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import SafeWithKeyholeDetail from "../EntityDetails/SafeWithKeyhole"

const Safe = styled(Entity)`
  border-radius: 0.25em 0.25em 0 0;

  background-color: #37474f;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0.25em 0.25em 0 0;

    box-shadow: inset 0 0.4em 0.8em -0.2em #fff4,
      inset 0 -0.2em 0.4em -0.1em #0004;
  }

  &::after {
    left: 0;
    top: 100%;

    width: 0.5em;
    height: 0.5em;

    border-radius: 100%;
    background-color: #37474f;

    transform: translate(-50%, -50%);
  }
`
Safe.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 5,
  height: 4
}

const Door = styled(Entity)`
  border-radius: 0 0 0.25em 0.25em;

  background-color: #37474f;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0 0 0.25em 0.25em;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4,
      inset 0 -0.4em 0.8em -0.2em #0004;
  }
`
Door.defaultProps = {
  ...Entity.defaultProps,
  width: 5,
  height: 1,
  z: 2,
  origin: { left: 0, top: 0 }
}

const Wheel = styled(Entity)`
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
Wheel.defaultProps = {
  ...Entity.defaultProps,
  z: 1.5,
  width: 3,
  height: 0.25
}

const SafeWithKeyhole = forwardRef(({ inspect, ...props }, ref) => {
  const isUnlocked = _.hasState("unlocked")(props)
  return (
    <Entity noVisual {...props} onClick={inspect} ref={ref}>
      <Safe top={2} />
      <Door left={0} top={4} rotation={isUnlocked ? 45 : 0}>
        <Wheel top={1.25} />
      </Door>
    </Entity>
  )
})
SafeWithKeyhole.name = "SafeWithKeyhole"
SafeWithKeyhole.templateName = "Safe with keyhole"
SafeWithKeyhole.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 5,
  height: 5
}
SafeWithKeyhole.states = ["Locked", "Unlocked"]
SafeWithKeyhole.Detail = SafeWithKeyholeDetail

export default SafeWithKeyhole
