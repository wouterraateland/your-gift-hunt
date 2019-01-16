import React from 'react'
import styled, { css } from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Worktop = styled(PhysicalObject.Part)`
  left: 0; top: 0; right: 0; bottom: 0;

  border-radius: .4em .4em 0 0;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: .4em .4em 0 0;
    box-shadow:
      inset 0 .2em .4em -.1em #fff4;
  }

  &::after {
    left: .5em; top: .5em;
    right: .5em; bottom: 0;

    border-radius: .2em .2em 0 0;
    box-shadow:
      0 -.2em .4em -.1em #0004,
      inset 0 .2em .4em -.1em #0004;
  }

  background-color: #999;

  background-image:
    repeating-linear-gradient(30deg, #0001, #fff1 .4em, #0001 .8em),
    repeating-linear-gradient(-30deg, #0001, #fff1 .4em, #0001 .8em);
`

const SinkPart = styled(PhysicalObject.Part)`
  left: 20%; top: 1em;
  bottom: .5em;

  width: 6em;
  border-radius: .4em;

  background: #faf1cd;

  &::before {
    left: 0; top: 0;
    right: 0; bottom: 0;

    border-radius: .4em;

    box-shadow:
      inset 0 .2em .4em -.1em #fff7,
      inset 0 -.2em .4em -.1em #0004;
  }

  &::after {
    left: .3em; top: .3em;
    right: .3em; bottom: 1.3em;

    border-radius: .3em;

    box-shadow:
      inset 0 -.2em .4em -.1em #fff7,
      inset 0 .2em .4em -.1em #0004,
      0 .2em .4em -.1em #fff7,
      0 -.2em .4em -.1em #0004;

    transition: background-color 1s linear;

    ${props => props.isConnected && css`
      background-color: #48f4;
    `}
  }
`

const Well = styled(PhysicalObject.Part)`
  left: 0; top: 0;
  right: 0; bottom: 0;

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
    left: 0; top: 0;
    right: 0; bottom: 0;

    width: .7em;
    height: .7em;
    margin: auto;

    box-shadow:
      inset 0 -.1em .2em -.05em #fff7,
      inset 0 .1em .2em -.05em #0004,
      0 .1em .2em -.05em #fff7,
      0 -.1em .2em -.05em #0004;
  }

  &::after {
    width: .15em;
    height: .15em;

    color: #333;

    box-shadow:
      .425em .2em,
      .6em .3em,
      .6em .5em,
      .425em .6em,
      .25em .3em,
      .25em .5em,
      .425em .2em .1em #0004,
      .6em .3em .1em #0004,
      .6em .5em .1em #0004,
      .425em .6em .1em #0004,
      .25em .3em .1em #0004,
      .25em .5em .1em #0004;
  }
`

const Faucet = styled(PhysicalObject.Part)`
  left: 0; bottom: .25em;
  right: 0;
  margin: auto;
  z-index: 1;

  width: .6em;
  height: .6em;
  border-radius: 100%;

  background: #999;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: 100%;

    box-shadow:
      inset 0 .2em .4em -.1em #fff9,
      inset 0 -.2em .4em -.1em #0009;
  }
`

const Knob = styled(PhysicalObject.Part)`
  bottom: 0;

  width: .5em;
  height: .5em;

  border-radius: .2em .2em .2em .2em / .2em .2em .4em .4em;

  background: #999;

  &::before {
    width: 100%;
    height: 100%;

    border-radius: .2em .2em .2em .2em / .2em .2em .4em .4em;
  }
`
const Cold = styled(Knob)`
  right: 50%;
  transform: translate(-.25em, -.3em) rotate(-60deg);

  background-image:
    radial-gradient(
      ellipse 10% 35% at 60% 40%,
      #fff, transparent
    ),
    linear-gradient(
      transparent 20%, #00f 20%,
      #00f 30%, transparent 30%
    );

  &::before {
    box-shadow:
      inset -.1em 0 .2em -.05em #0009,
      inset .1em 0 .2em -.05em #0004;
  }
`

const Warm = styled(Knob)`
  left: 50%;
  transform: translate(.25em, -.3em) rotate(60deg);

  background-image:
    radial-gradient(
      ellipse 10% 35% at 40% 40%,
      #fff, transparent
    ),
    linear-gradient(
      transparent 20%, #f00 20%,
      #f00 30%, transparent 30%
    );

  &::before {
    box-shadow:
      inset .1em 0 .2em -.05em #0004,
      inset -.1em 0 .2em -.05em #0009;
  }
`

const Neck = styled(PhysicalObject.Part)`
  left: 50%; bottom: .2em;
  z-index: 1;

  width: .2em;
  height: 2em;
  margin: auto;

  border-radius: .1em;

  background-color: #999;
  background-image:
    radial-gradient(ellipse 20% 25% at 30% 35%, #fff, transparent),
    radial-gradient(ellipse 50% 65% at 50% 35%, transparent, #555);

  transform-origin: .1em 1.9em;

  transform: rotate(20deg) translate(-50%, 0);
`

const Sink = ({ state, ...props }) => {
  const isConnected = state === 'connected'

  return (
    <PhysicalObject width={15} height={6} {...props}>
      <Worktop z={2} />
      <SinkPart isConnected={isConnected} z={.1}>
        <Well z={0} />
        <Faucet z={.1}>
          <Cold z={.2} angle={-60} />
          <Warm z={.2} angle={60} />
          <Neck z={.5} angle={10} />
        </Faucet>
      </SinkPart>
    </PhysicalObject>
  )
}
Sink.entityId = 'sink'

export default Sink
