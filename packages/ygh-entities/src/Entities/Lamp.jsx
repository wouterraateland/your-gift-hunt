import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"

const Foot = styled(Entity)`
  border-radius: 100em;

  background: radial-gradient(
      ellipse 50% 50% at 50% 50%,
      #0009,
      transparent 25%,
      transparent 90%,
      #0009
    ),
    linear-gradient(135deg, transparent, currentColor 40%),
    radial-gradient(
      ellipse 50% 50% at 55% 55%,
      transparent 80%,
      #fff 90%,
      transparent 100%
    );

  background-color: currentColor;
`
Foot.defaultProps = {
  z: 0,
  width: 2.5,
  height: 2.5
}

const Neck = styled(Entity)`
  border-radius: 0.125em;

  background-image: radial-gradient(
      ellipse 30% 20% at 75% 30%,
      #fff,
      transparent
    ),
    radial-gradient(ellipse 75% 50% at 75% 50%, transparent, #0009);
  background-color: currentColor;
`
Neck.defaultProps = {
  ...Entity.defaultProps,
  width: 5,
  height: 0.25,
  origin: { left: 0.125 },
  z: 3
}

const Head = styled(Entity)`
  border-radius: 100%;

  background: radial-gradient(transparent, #0009);
  background-color: currentColor;
`
Head.defaultProps = {
  ...Entity.defaultProps,
  width: 1.25,
  height: 1.25,
  z: 2
}

const Light = styled(Entity)`
  cursor: initial;
  pointer-events: none;
  z-index: -1;

  opacity: ${props => (props.isOn ? 1 : 0)};

  background: radial-gradient(
    circle closest-side,
    rgba(249, 220, 141, 0.7) 10%,
    transparent
  );

  transition: opacity 0.5s ease-out;
`
Light.defaultProps = {
  ...Entity.defaultProps,
  width: 7.5,
  height: 7.5
}

const Lamp = forwardRef(({ dispatchInputAction, children, ...props }, ref) => {
  const isOn = _.hasState("on")(props)
  return (
    <Entity
      noVisual
      {...props}
      onClick={() =>
        dispatchInputAction(props.state, "power", isOn ? "off" : "on")
      }
      ref={ref}
    >
      <Foot width={props.width} height={props.height} />
      <Light
        isOn={isOn}
        left={1 + props.width * 2.25}
        width={props.width * 3}
        height={props.height * 3}
      />
      <Head
        left={1 + props.width * 2}
        width={props.width / 2}
        height={props.height / 2}
      />
      <Neck width={props.width * 1.5 + 1.25} height={props.height / 10} />
      {children}
    </Entity>
  )
})
Lamp.name = "Lamp"
Lamp.templateName = "Lamp"
Lamp.defaultProps = {
  ...Entity.defaultProps,
  width: 2.5,
  height: 2.5,
  rotation: 180,
  z: 1,
  color: "#424242"
}
Lamp.states = ["Off", "On"]

export default Lamp
