import React from 'react'
import styled from 'styled-components'

import PhysicalObject from './PhysicalObject'

const Pot = styled(PhysicalObject.Part)`
  width: 4em;
  height: 4em;

  border: .5em solid #c56849;
  border-radius: 100%;

  background-color: #6d4c41;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%; top: 50%;

    display: block;
    border-radius: 100%;

    transform: translate(-50%, -50%);
  }

  &::before {
    width: 4em;
    height: 4em;

    box-shadow:
      inset .125em .125em .125em 0 rgba(255, 255, 255, .5),
      inset -.125em -.125em .125em 0 rgba(0, 0, 0, .5) !important;
  }

  &::after {
    width: 3em;
    height: 3em;

    box-shadow:
      .125em .125em .125em 0 rgba(255, 255, 255, .5),
      -.125em -.125em .125em 0 rgba(0, 0, 0, .2);
  }
`

const Leaf = styled(PhysicalObject.Part)`
  position: absolute;
  left: 50%; top: 50%;
  z-index: ${props => 1 + Math.round((props.size - .8) * 50)};

  transform-origin: 0 0;
  transform: ${props => `
    rotate(${props.angle}deg)
    scale(${props.size * (.2 + .8 * props.grown)})
  `};

  transition:
    transform 2s ease-in-out,
    color 2s ease-in-out;
  transition-delay: ${props => props.i * .2}s;

  will-change: transform, color;

  color: ${props => props.grown ? '#4caf50' : '#cddc39'};

  &::before, &::after {
    content: '';

    position: absolute;
    left: 0; top: 0;

    opacity: ${props => props.planted ? 1 : 0};
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
    border-radius: 100% 100% ${props => props.grown ? 0 : 100}% 100%;

    box-shadow: 0 0 .125em rgba(0, 0, 0, .2);

    transform-origin: 0 0;
    transform: ${props => `translate(-.125em, -.125em) skew(${props.grown ? 10 : 0}deg, ${props.grown ? 10 : 0}deg)`};

    transition:
      opacity .5s ease-out,
      transform 2s ease-in-out,
      border-radius 2s ease-in-out;
    transition-delay: ${props => props.i * .2}s;

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

const leafs = 5
const Plant = plantProps => Array(leafs).fill(0).map((_, i) =>
  <Leaf
    z={4}
    key={i}
    i={i}
    angle={360 * i / leafs}
    {...plantProps}
    size={.9 + .1 * Math.sin(23 * i + 1)}
  />
)

const PlantPot = ({ state, ...props }) => (
  <PhysicalObject width={4} height={4} {...props}>
    <Pot z={1.5} />
    <Plant
      planted={state === 'planted' || state === 'grown'}
      grown={state === 'grown'}
    />
  </PhysicalObject>
)
PlantPot.entityId = 'plant-pot'

export default PlantPot
