import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import SafeWithCodeDetail from "../EntityDetails/SafeWithCode"

const Safe = styled(Entity)`
  border-radius: 0.25em 0.25em 0 0;

  background-color: currentColor;

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
    background-color: currentColor;

    transform: translate(-50%, -50%);
  }
`
Safe.defaultProps = {
  ...Entity.defaultProps,
  width: 5,
  height: 4,
  z: 2
}

const Door = styled(Entity)`
  border-radius: 0 0 0.25em 0.25em;

  background-color: currentColor;

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

    width: 80%;
    height: 1.5em;

    background: radial-gradient(
      ellipse 50% 90% at 50% 10%,
      ${props => (props.isUnlocked ? "#9e8c" : "#e98c")},
      transparent
    );
  }
`
Door.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 5,
  height: 1,
  origin: { left: 0, top: 0 }
}

const SafeWithCode = forwardRef(({ inspect, children, ...props }, ref) => {
  const isUnlocked = _.hasState("unlocked")(props)
  return (
    <Entity noVisual {...props} onClick={inspect} ref={ref}>
      <Safe
        top={(props.height - 1) / 2}
        width={props.width}
        height={props.height}
        height={props.height - 1}
      />
      <Door
        isUnlocked={isUnlocked}
        top={props.height - 1}
        left={0}
        width={props.width}
        rotation={isUnlocked ? 45 : 0}
      />
      {children}
    </Entity>
  )
})
SafeWithCode.name = "SafeWithCode"
SafeWithCode.templateName = "Safe with code"
SafeWithCode.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 5,
  height: 5,
  color: "#37474f"
}
SafeWithCode.states = ["Locked", "Unlocked"]
SafeWithCode.Detail = SafeWithCodeDetail

export default SafeWithCode
