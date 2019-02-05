import React, { forwardRef } from "react"
import styled, { css } from "styled-components"
import _ from "utils"

import PhysicalObject from "./PhysicalObject"

const Worktop = styled(PhysicalObject.Part)`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  border-radius: 0.4em 0.4em 0 0;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: 0.4em 0.4em 0 0;
    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4;
  }

  &::after {
    left: 0.5em;
    top: 0.5em;
    right: 0.5em;
    bottom: 0;

    border-radius: 0.2em 0.2em 0 0;
    box-shadow: 0 -0.2em 0.4em -0.1em #0004, inset 0 0.2em 0.4em -0.1em #0004;
  }

  background-color: #999;

  background-image: repeating-linear-gradient(
      30deg,
      #0001,
      #fff1 0.4em,
      #0001 0.8em
    ),
    repeating-linear-gradient(-30deg, #0001, #fff1 0.4em, #0001 0.8em);
`

const SinkPart = styled(PhysicalObject.Part)`
  left: 20%;
  top: 1em;
  bottom: 0.5em;

  width: 6em;
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

const Well = styled(PhysicalObject.Part)`
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  margin: auto;

  width: 1em;
  height: 1em;

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

const Faucet = styled(PhysicalObject.Part)`
  left: 0;
  bottom: 0.25em;
  right: 0;
  margin: auto;
  z-index: 1;

  width: 0.6em;
  height: 0.6em;
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

const Knob = styled(PhysicalObject.Part)`
  bottom: 0;

  width: 0.5em;
  height: 0.5em;

  border-radius: 0.2em 0.2em 0.2em 0.2em / 0.2em 0.2em 0.4em 0.4em;

  background: #999;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: 0.2em 0.2em 0.2em 0.2em / 0.2em 0.2em 0.4em 0.4em;
  }
`
const Cold = styled(Knob)`
  right: 50%;
  transform: translate(-0.25em, -0.3em) rotate(-60deg);

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

const Warm = styled(Knob)`
  left: 50%;
  transform: translate(0.25em, -0.3em) rotate(60deg);

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

const Neck = styled(PhysicalObject.Part)`
  left: 50%;
  bottom: 0.2em;
  z-index: 1;

  width: 0.2em;
  height: 2em;
  margin: auto;

  border-radius: 0.1em;

  background-color: #999;
  background-image: radial-gradient(
      ellipse 20% 25% at 30% 35%,
      #fff,
      transparent
    ),
    radial-gradient(ellipse 50% 65% at 50% 35%, transparent, #555);

  transform-origin: 0.1em 1.9em;

  transform: rotate(20deg) translate(-50%, 0);
`

const Sink = forwardRef((props, refs) => {
  const sink = refs ? refs.sink : null
  const isConnected = _.hasState("connected")(props)

  return (
    <PhysicalObject width={15} height={6} {...props}>
      <Worktop z={2} />
      <SinkPart ref={sink} isConnected={isConnected} z={0.1}>
        <Well z={0} />
        <Faucet z={0.1}>
          <Cold z={0.2} angle={-60} />
          <Warm z={0.2} angle={60} />
          <Neck z={0.5} angle={10} />
        </Faucet>
      </SinkPart>
    </PhysicalObject>
  )
})
Sink.entityName = "Sink"

export default Sink
