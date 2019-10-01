import React, { forwardRef } from "react"
import styled from "styled-components"
import { darken } from "polished"

import Entity from "../Entity"
import TVDetail from "../EntityDetails/TV"

const Leg = styled(Entity)`
  &::before,
  &::after {
    width: 100%;
    height: 50%;

    background-color: ${props => darken(0.15)(props.color)};
  }

  &::before {
    bottom: 50%;
    border-radius: 1em 1em 0 0;
    transform: skewX(10deg);
  }

  &::after {
    top: 50%;
    border-radius: 0 0 1em 1em;
    transform: skewX(-10deg);
  }
`
Leg.defaultProps = {
  ...Entity.defaultProps,
  width: 0.25
}

const Screen = styled(Entity)`
  border-radius: 100% 100% 0 0;
  background-color: currentColor;

  &::after {
    left: 0;
    top: 100%;

    width: 100%;
    height: 1em;

    background: radial-gradient(ellipse 50% 100% at 50% 0, #09f9, transparent);
  }
`
Screen.defaultProps = {
  ...Entity.defaultProps,
  height: 0.5
}

const TV = forwardRef(({ inspect, children, ...props }, ref) => (
  <Entity noVisual {...props} onClick={inspect} ref={ref}>
    <Leg color={props.color} height={props.height} left={1} />
    <Leg color={props.color} height={props.height} right={1} rotation={180} />
    <Screen width={props.width} />
    {children}
  </Entity>
))
TV.name = "TV"
TV.templateName = "TV"
TV.defaultProps = {
  ...Entity.defaultProps,
  width: 8,
  height: 2,
  color: "#3F3F3F"
}
TV.states = ["Commercial", "Program"]
TV.Detail = TVDetail

export default TV
