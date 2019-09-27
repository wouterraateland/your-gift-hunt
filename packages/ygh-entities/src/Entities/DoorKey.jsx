import React, { forwardRef } from "react"
import styled from "styled-components"
import { darken } from "polished"

import Entity from "../Entity"

const Body = styled(Entity)`
  border-radius: 1em;

  box-shadow: inset 0 0 0 0.1em ${props => props.darkColor};

  background: radial-gradient(
    circle closest-side at 50% 70%,
    transparent ${props => props.height * 0.15 - 0.05}em,
    ${props => props.darkColor} ${props => props.height * 0.15 - 0.025}em,
    ${props => props.darkColor} ${props => props.height * 0.15 + 0.075}em,
    ${props => props.color} ${props => props.height * 0.15 + 0.1}em
  );

  color: ${props => props.color};
`

const Neck = styled(Entity)`
  left: 50%;
  transform: translate(-50%, 0);

  width: 0.5em;
  height: calc(100% + 0.1em);
  border: 0.1em solid ${props => props.darkColor};
  border-bottom: none;
  border-radius: 1em 1em 0 0;

  background-color: ${props => props.color};
  color: ${props => props.color};

  &::before,
  &::after {
    right: 100%;

    height: 0.3em;
    border: 0.1em solid ${props => props.darkColor};
    border-right: none;
    border-radius: 1em 0 0 1em;

    background: ${props => props.color};
  }

  &::before {
    top: ${props => props.height / 10}em;
    width: ${props => props.width / 3}em;
  }

  &::after {
    top: ${props => props.height / 10 + 0.4}em;
    width: ${props => props.width / 4}em;
  }
`
Neck.defaultProps = {
  ...Entity.defaultProps,
  width: 0.5
}

const DoorKey = forwardRef(({ children, ...props }, ref) => (
  <Entity noVisual ref={ref} {...props}>
    <Body
      left="50%"
      bottom={Math.min(props.width, props.height - 1) / 2}
      width={props.width}
      height={Math.min(props.width, props.height - 1)}
      color={props.color}
      darkColor={darken(0.1)(props.color)}
    />
    <Neck
      top={Math.max(1, props.height - props.width) / 2}
      width={props.width}
      height={Math.max(1, props.height - props.width)}
      color={props.color}
      darkColor={darken(0.1)(props.color)}
    />
    {children}
  </Entity>
))
DoorKey.name = "DoorKey"
DoorKey.displayName = "DoorKey"
DoorKey.templateName = "Door key"
DoorKey.defaultProps = {
  ...Entity.defaultProps,
  width: 1,
  height: 2,
  color: "#9a8d7d"
}
DoorKey.states = []
DoorKey.Detail = DoorKey

export default DoorKey
