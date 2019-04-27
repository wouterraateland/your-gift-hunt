import styled, { keyframes } from "styled-components"

import { Entity } from "../Entities"

const keyTurn1 = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  100% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`
const keyTurn2 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
`

const Keyhole = styled(Entity)`
  border-radius: 100%;

  &,
  &::before {
    box-shadow: 0.2em 0.2em 0.4em -0.1em #fff4, -0.2em -0.2em 0.4em -0.1em #0004;
    background-color: #111;
  }

  &::before {
    left: 0.4em;
    top: 1em;

    width: 0.7em;
    height: 1.5em;
    border-radius: 0 0 0.5em 0.5em;
  }

  &::after {
    left: 50%;
    top: 50%;

    width: 0.5em;
    height: 2.4em;

    border-radius: 0.2em;
    box-shadow: inset 0.1em 0 0.2em -0.05em #fff6,
      inset -0.1em 0 0.2em -0.05em #0006;

    background-color: #face32;

    transform: translate(-50%, -50%)
      rotate(${props => (props.isUnlocked ? 0 : 90)}deg);

    animation: ${props => (props.isUnlocked ? keyTurn1 : keyTurn2)} 0.5s
      ${props => (props.isUnlocked ? 0 : 1)}s ease-in-out forwards;
  }
`
Keyhole.defaultProps = {
  ...Entity.defaultProps,
  noVisual: true,
  width: 1.5,
  height: 1.5
}

export default Keyhole
