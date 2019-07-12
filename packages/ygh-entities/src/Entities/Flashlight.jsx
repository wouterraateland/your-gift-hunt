import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"

const Body = styled(Entity)`
  &,
  &::after {
    border-radius: 0.1em;
  }

  background: radial-gradient(ellipse 30% 20% at 40% 35%, #fff9, transparent),
    linear-gradient(90deg, #444 20%, #ffd65a 20%);

  &::after {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: inset 0 -0.2em 0.4em -0.2em #000,
      inset 0 0.1em 0.2em -0.1em #0009;
  }
`
Body.defaultProps = {
  ...Entity.defaultProps,
  z: 0.25,
  width: 2,
  height: 0.5,
  rotation: -45
}

const Holder = styled(Entity)`
  border-radius: 0.1em 0.1em 0 0;

  background: linear-gradient(#222, #444);

  transform: scale(1, ${props => (props.isEmpty ? 1 : 0)});

  transition: transform 0.2s ease-in-out;
`
Holder.defaultProps = {
  ...Entity.defaultProps,
  width: 0.7,
  height: 0.3,
  origin: { left: "50%", top: "100%" }
}

const Head = styled(Entity)`
  &,
  &::after {
    border-radius: 0.5em 0.1em 0.1em 0.5em / 0.125em 0.1em 0.1em 0.125em;
  }
  background: radial-gradient(ellipse 40% 20% at 40% 35%, #fff9, transparent),
    linear-gradient(90deg, #ffd65a 60%, #444 60%);

  &::after {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: inset 0 -0.2em 0.4em -0.2em #000,
      inset 0 0.1em 0.2em -0.1em #0009;
  }

  &::before {
    left: 100%;
    top: 50%;

    width: 0.75em;
    height: 0.75em;

    opacity: ${props => (props.isOn ? 1 : 0)};

    background: radial-gradient(
      ellipse 100% 50% at 0% 50%,
      #b9e6ff,
      transparent
    );

    transform: translate(0, -50%);

    transition: opacity 0.1s ease-out;
  }
`
Head.defaultProps = {
  ...Entity.defaultProps,
  z: 0.5,
  width: 0.75,
  height: 0.75
}

const Button = styled.div`
  cursor: pointer;

  position: absolute;
  left: 45%;
  top: 50%;
  z-index: 1;

  width: 0.3em;
  height: 0.2em;
  border-radius: 0.3em;

  background: radial-gradient(ellipse 50% 50% at 50% 50%, #000, #444);

  transform: translate(-50%, -50%);
`

const Flashlight = forwardRef(
  ({ dispatchInputAction, children, ...props }, ref) => {
    const isOn = _.hasState("on")(props)
    const isEmpty = _.hasState("empty")(props)

    return (
      <Body {...props} ref={ref}>
        <Holder isEmpty={isEmpty} left={0.8} top={-0.0} />
        <Button
          onClick={() =>
            !isEmpty &&
            dispatchInputAction(props.state, "power", isOn ? "off" : "on")
          }
        />
        <Head isOn={isOn} left={1.75} />
        {children}
      </Body>
    )
  }
)
Flashlight.name = "Flashlight"
Flashlight.templateName = "Flashlight"
Flashlight.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 0.5
}
Flashlight.states = ["Empty", "Off", "On"]
Flashlight.Detail = Flashlight

export default Flashlight
