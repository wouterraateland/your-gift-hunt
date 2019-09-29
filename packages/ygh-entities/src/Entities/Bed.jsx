import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "../Entity"

const Frame = styled(Entity)`
  top: -0.25em;
  left: -0.25em;
  bottom: -0.25em;
  right: -0.25em;

  box-shadow: inset 0 0 0.2em #0009;

  background-color: currentColor;

  &::before {
    top: 0.25em;
    left: 0.25em;
    bottom: 0.25em;
    right: 0.25em;

    box-shadow: 0 0 0.2em #0009;
  }

  &::after {
    left: 50%;
    top: 50%;

    width: 0.5em;
    height: 0.5em;
    border-radius: 0.1em;

    transform: translate(-50%, -50%);

    box-shadow: ${({ width: w, height: h }) =>
      `${w / 2 - 0.125}em ${h / 2 - 0.125}em, ${-w / 2 + 0.125}em ${h / 2 -
        0.125}em, ${w / 2 - 0.125}em ${-h / 2 + 0.125}em, ${-w / 2 +
        0.125}em ${-h / 2 + 0.125}em`};
  }
`

const Mattress = styled(Entity)`
  border-radius: 0.25em;
  box-shadow: inset 0 0 0.5em -0.1em #5309;

  background-color: #fff;
`

const Blanket = styled(Entity)`
  border-radius: 10% 5% 15% 10% / 5% 10% 10% 15%;
  box-shadow: inset 0 0 1em #0006, inset 0 0 0.25em #000c;

  background-color: currentColor;
`
Blanket.defaultProps = {
  ...Entity.defaultProps,
  z: 1
}

const Cushion = styled(Entity)`
  border-radius: 30% 20% 50% 40% / 50% 40% 20% 30%;
  box-shadow: inset 0 0 1em #0006, inset 0 0 0.25em #000c;

  background-color: currentColor;
`

const Bed = forwardRef(({ children, ...props }, ref) => (
  <Frame {...props} ref={ref} color="#cebb81">
    <Mattress height={props.height - 0.5} width={props.width - 0.5} />
    <Blanket
      color={props.color}
      left={props.width * 0.25 - 0.25}
      height={props.height + 0.25}
      width={props.width * 0.5}
    />
    <Cushion
      color={props.color}
      right={1 + (props.height - 2) * 0.3}
      height={props.height - 2}
      width={(props.height - 2) * 0.75}
    />
    {children}
  </Frame>
))
Bed.name = "Bed"
Bed.templateName = "Bed"
Bed.defaultProps = {
  ...Entity.defaultProps,
  width: 10,
  height: 5,
  color: "#f00"
}

export default Bed
