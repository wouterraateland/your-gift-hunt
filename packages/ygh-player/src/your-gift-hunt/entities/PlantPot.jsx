import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "./Entity"

const Pot = styled(Entity)`
  border: 0.5em solid #c56849;
  border-radius: 100%;

  background-color: #6d4c41;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;

    display: block;
    border-radius: 100%;

    transform: translate(-50%, -50%);
  }

  &::before {
    width: 133.333%;
    height: 133.333%;

    box-shadow: inset 0.125em 0.125em 0.125em 0 rgba(255, 255, 255, 0.5),
      inset -0.125em -0.125em 0.125em 0 rgba(0, 0, 0, 0.5) !important;
  }

  &::after {
    width: 100%;
    height: 100%;

    box-shadow: 0.125em 0.125em 0.125em 0 rgba(255, 255, 255, 0.5),
      -0.125em -0.125em 0.125em 0 rgba(0, 0, 0, 0.2);
  }
`

const Leaf = styled(Entity)`
  pointer-events: none;

  z-index: ${props => 1 + Math.round((props.size - 0.8) * 50)};

  transform: ${props => `
    scale(${props.size * (0.2 + 0.8 * props.isGrown)})
  `};

  transition:
    transform 2s ease-in-out,
    color 2s ease-in-out;
  transition-delay: ${props => props.i * 0.2}s;

  will-change: transform, color;

  color: ${props => (props.isGrown ? "#4caf50" : "#cddc39")};

  &::before, &::after {
    content: '';

    position: absolute;
    left: 0; top: 0;

    opacity: ${props => (props.isPlanted ? 1 : 0)};
  }

  &::before {
    width: 3em;
    height: 3em;

    background:
      linear-gradient(135deg, currentColor, transparent, currentColor),
      linear-gradient(45deg,
        rgba(0, 0, 0, .1),
        transparent,
        rgba(255, 255, 255, .2) 49%,
        rgba(0, 0, 0, .2) 51%,
        transparent,
        rgba(0, 0, 0, .1)
      );
    background-color: currentColor;
    border-radius: 100% 100% ${props => (props.isGrown ? 0 : 100)}% 100%;

    box-shadow: 0 0 .125em rgba(0, 0, 0, .2);

    transform-origin: 0 0;
    transform: ${props =>
      `translate(-.125em, -.125em) skew(${props.isGrown ? 10 : 0}deg, ${
        props.isGrown ? 10 : 0
      }deg)`};

    transition:
      opacity .5s ease-out,
      transform 2s ease-in-out,
      border-radius 2s ease-in-out;
    transition-delay: ${props => props.i * 0.2}s;

    will-change: transform, border-radius;
  }

  &::after {
    width: .75em;
    height: .25em;
    border-radius: .125em;

    background-image:
      linear-gradient(90deg, #1b5e20 .25em, transparent, currentColor .75em),
      linear-gradient(rgba(0, 0, 0, .4), transparent, rgba(0, 0, 0, .4));
    background-color: currentColor;

    transform-origin: .125em .125em;
    transform: translate(-.125em, -.125em) rotate(45deg);

    transition:
      opacity: .5s ease-out;
  }
`
Leaf.defaultProps = {
  ...Entity.defaultProps,
  z: 4,
  origin: { left: 0, top: 0 }
}

const leafs = 5
const Plant = plantProps =>
  Array(leafs)
    .fill(0)
    .map((_, i) => (
      <Leaf
        key={i}
        i={i}
        rotation={(360 * i) / leafs}
        {...plantProps}
        size={0.9 + 0.1 * Math.sin(23 * i + 1)}
      />
    ))

const PlantPot = forwardRef((props, ref) => {
  const isGrown = props.state === "grown"
  const isPlanted = props.state === "planted" || isGrown

  return (
    <Pot {...props} ref={ref}>
      <Plant isPlanted={isPlanted} isGrown={isGrown} />
    </Pot>
  )
})
PlantPot.name = "PlantPot"
PlantPot.templateName = "Plant pot"
PlantPot.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 4,
  z: 1.5
}

export default PlantPot
