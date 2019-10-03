import React, { forwardRef } from "react"
import styled from "styled-components"
import { darken, desaturate } from "polished"

import Entity from "../Entity"

const Frame = styled(Entity)`
  background-color: currentColor;
`

const Compartment = styled.div`
  position: absolute;
  width: calc(50% - 0.75em);

  box-shadow: inset 0 0.25em 0.75em -0.25em #0009;
  background-color: ${props => props.color};
`

const colors = [`#1A66B3`, `#2E8286`, `#159060`, `#82AF52`, `#D9C5A6`].sort(
  () => (Math.random() < 0.5 ? 1 : -1)
)

const Dress = styled.div`
  position: absolute;
  top: 1.75em;

  width: 2em;
  height: ${() => 8 + 4 * Math.random()}em;

  box-shadow: 0 0.25em 0.75em -0.25em #0006;
  border-radius: 0.5em 0.5em 1em 1em / 0.5em 0.5em 0.5em 0.5em;

  transform: skewY(-30deg);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: 0.5em 0.5em 1em 1em / 0.5em 0.5em 0.5em 0.5em;

    background-color: currentColor;

    mask: radial-gradient(
      circle 0.5em at 50% 0,
      transparent 0.45em,
      #000 0.5em
    );
  }

  &::after {
    content: "";

    position: absolute;
    left: 50%;
    top: -0.6em;
    z-index: -1;

    width: 0.75em;
    height: 0.75em;
    border: 0.1em solid #999;
    border-left-color: transparent;
    border-radius: 100%;

    transform: translate(-50%, 0);
  }
`

const Bar = styled.div`
  position: absolute;
  top: 1.5em;
  left: 0;
  right: 0;

  height: 0.375em;

  background: linear-gradient(#999, #ccc 33%, #666);
`

const Closet = forwardRef(({ children, ...props }, ref) => {
  const darkColor = desaturate(0.1)(darken(0.1)(props.color))

  return (
    <Frame {...props} ref={ref}>
      <Compartment
        color={darkColor}
        style={{
          top: "0.5em",
          left: "0.5em",
          height: `${props.height * 0.25 - 0.75}em`
        }}
      />
      <Compartment
        color={darkColor}
        style={{
          top: "0.5em",
          right: "0.5em",
          height: `${props.height * 0.5 - 0.75}em`
        }}
      />
      <Compartment
        color={darkColor}
        style={{
          bottom: "0.5em",
          left: "0.5em",
          height: `${props.height * 0.75 - 0.75}em`
        }}
      >
        {Array(5)
          .fill()
          .map((_, i) => (
            <Dress
              key={i}
              style={{
                left: `${0.5 + (i * 3) / 4}em`,
                color: colors[i]
              }}
            />
          ))}
        <Bar />
      </Compartment>
      <Compartment
        color={darkColor}
        style={{
          bottom: "0.5em",
          right: "0.5em",
          height: `${props.height * 0.5 - 0.75}em`
        }}
      />
      {children}
    </Frame>
  )
})
Closet.name = "Closet"
Closet.templateName = "Closet"
Closet.defaultProps = {
  ...Entity.defaultProps,
  width: 14,
  height: 20,
  color: "#F2DFDA"
}
Closet.states = ["Locked", "Unlocked"]

export default Closet
