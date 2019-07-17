import React, { forwardRef } from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"

const SinkContainer = styled(Entity)`
  border-radius: 0.4em;

  background: #faf1cd;

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    border-radius: 0.4em;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff7,
      inset 0 -0.2em 0.4em -0.1em #0004;
  }

  &::after {
    left: 0.3em;
    top: 0.3em;
    right: 0.3em;
    bottom: 1.3em;

    border-radius: 0.3em;

    box-shadow: inset 0 -0.2em 0.4em -0.1em #fff7,
      inset 0 0.2em 0.4em -0.1em #0004, 0 0.2em 0.4em -0.1em #fff7,
      0 -0.2em 0.4em -0.1em #0004;

    transition: background-color 1s linear;

    ${props =>
      props.isConnected &&
      css`
        background-color: #48f4;
      `}
  }
`

const Well = styled(Entity)`
  background: #999;

  &,
  &::before,
  &::after {
    border-radius: 100%;
  }

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    width: 0.7em;
    height: 0.7em;
    margin: auto;

    box-shadow: inset 0 -0.1em 0.2em -0.05em #fff7,
      inset 0 0.1em 0.2em -0.05em #0004, 0 0.1em 0.2em -0.05em #fff7,
      0 -0.1em 0.2em -0.05em #0004;
  }

  &::after {
    width: 0.15em;
    height: 0.15em;

    color: #333;

    box-shadow: 0.425em 0.2em, 0.6em 0.3em, 0.6em 0.5em, 0.425em 0.6em,
      0.25em 0.3em, 0.25em 0.5em, 0.425em 0.2em 0.1em #0004,
      0.6em 0.3em 0.1em #0004, 0.6em 0.5em 0.1em #0004,
      0.425em 0.6em 0.1em #0004, 0.25em 0.3em 0.1em #0004,
      0.25em 0.5em 0.1em #0004;
  }
`
Well.defaultProps = {
  ...Entity.defaultProps,
  width: 1,
  height: 1
}

const Faucet = styled(Entity)`
  border-radius: 100%;

  background: #999;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: 100%;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff9,
      inset 0 -0.2em 0.4em -0.1em #0009;
  }
`
Faucet.defaultProps = {
  ...Entity.defaultProps,
  z: 1,
  width: 0.6,
  height: 0.6
}

const Knob = styled(Entity)`
  border-radius: 0.2em 0.2em 0.2em 0.2em / 0.2em 0.2em 0.4em 0.4em;

  background: #999;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0.2em 0.2em 0.2em 0.2em / 0.2em 0.2em 0.4em 0.4em;
  }
`
Knob.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 0.5,
  height: 0.5,
  origin: { left: "50%", top: "100%" }
}

const Cold = styled(Knob)`
  background-image: radial-gradient(
      ellipse 10% 35% at 60% 40%,
      #fff,
      transparent
    ),
    linear-gradient(transparent 20%, #00f 20%, #00f 30%, transparent 30%);

  &::before {
    box-shadow: inset -0.1em 0 0.2em -0.05em #0009,
      inset 0.1em 0 0.2em -0.05em #0004;
  }
`
Cold.defaultProps = Knob.defaultProps

const Warm = styled(Knob)`
  background-image: radial-gradient(
      ellipse 10% 35% at 40% 40%,
      #fff,
      transparent
    ),
    linear-gradient(transparent 20%, #f00 20%, #f00 30%, transparent 30%);

  &::before {
    box-shadow: inset 0.1em 0 0.2em -0.05em #0004,
      inset -0.1em 0 0.2em -0.05em #0009;
  }
`
Warm.defaultProps = Knob.defaultProps

const Neck = styled(Entity)`
  border-radius: 0.1em;

  background-color: #999;
  background-image: radial-gradient(
      ellipse 20% 25% at 30% 35%,
      #fff,
      transparent
    ),
    radial-gradient(ellipse 50% 65% at 50% 35%, transparent, #555);
`
Neck.defaultProps = {
  ...Entity.defaultProps,
  origin: { left: 0.1, top: 1.9 },
  width: 0.2,
  height: 2,
  z: 3
}

const Sink = forwardRef((props, ref) => {
  const isConnected = _.hasState("connected")(props)

  return (
    <SinkContainer ref={ref} isConnected={isConnected} {...props}>
      <Well left="50%" top="50%" />
      <Faucet left="50%" top={4}>
        <Cold rotation={-60} top="30%" left="10%" />
        <Warm rotation={60} top="30%" left="90%" />
        <Neck rotation={20} top="50%" left="50%" />
      </Faucet>
    </SinkContainer>
  )
})
Sink.name = "Sink"
SinkContainer.defaultProps = {
  ...Entity.defaultProps,
  width: 6,
  height: 5,
  z: 1
}

export default Sink
