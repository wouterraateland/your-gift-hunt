import React, { memo, useRef, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

import Draggable, { dragStyles } from 'components/Draggable'

const dist = (p1, p2) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))

const Pot = memo(styled.div`
  position: relative;

  width: 16vw;
  height: 16vw;
  padding: 2vw;

  border-radius: 100%;

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
    width: 16vw;
    height: 16vw;

    box-shadow:
      inset .5vw .5vw .5vw 0 rgba(255, 255, 255, .5),
      inset -.5vw -.5vw .5vw 0 rgba(0, 0, 0, .5) !important;

    background-color: #c56849;
  }

  &::after {
    width: 12vw;
    height: 12vw;

    box-shadow:
      .5vw .5vw .5vw 0 rgba(255, 255, 255, .5),
      -.5vw -.5vw .5vw 0 rgba(0, 0, 0, .2);

    background-color: #6d4c41;
  }

  ${dragStyles(1)}
`)

const Leaf = styled.div`
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
    width: 12vw;
    height: 12vw;

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

    box-shadow: 0 0 .5vw rgba(0, 0, 0, .2);

    transform-origin: 0 0;
    transform: ${props => `translate(-.5vw, -.5vw) skew(${props.grown ? 10 : 0}deg, ${props.grown ? 10 : 0}deg)`};

    transition:
      opacity .5s ease-out,
      transform 2s ease-in-out,
      border-radius 2s ease-in-out;
    transition-delay: ${props => props.i * .2}s;

    will-change: transform, border-radius;
  }

  &::after {
    width: 3vw;
    height: 1vw;
    border-radius: .5vw;

    background-image:
      linear-gradient(90deg, #1b5e20 1vw, transparent, currentColor 3vw),
      linear-gradient(rgba(0, 0, 0, .4), transparent, rgba(0, 0, 0, .4));
    background-color: currentColor;

    transform-origin: .5vw .5vw;
    transform: translate(-.5vw, -.5vw) rotate(45deg);

    transition:
      opacity: .5s ease-out;
  }
`

const leafs = 5
const Plant = memo(plantProps => Array(leafs).fill(0).map((_, i) =>
  <Leaf
    key={i}
    i={i}
    angle={360 * i / leafs}
    {...plantProps}
    size={.9 + .1 * Math.sin(23 * i + 1)}
  />
))

export default () => {
  const potEl = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { read, write } = useContext(StoreContext)

  function updatePosition() {
    if (potEl.current) {
      const rect = potEl.current.getClientRects()[0]
      setPosition({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      })
    }
  }

  function handleOnDrag() {
    updatePosition()
  }

  useEffect(updatePosition, [potEl.current])

  const state = read('plant', 0)
  const seedPosition = read('seed', false)
  const { lightPosition, lampState } = read('lamp', { lampState: false, lightPosition: false })

  if (state === 0 && seedPosition && dist(seedPosition, position) < 25) {
    write('plant', 1)
  }
  if (state === 1 && lightPosition && lampState && dist(lightPosition, position) < 25) {
    write('plant', 2)
    write('responses', responses => [
      ...(responses || []).filter(res => res.pieceId !== 6),
      { pieceId: 6, response: 'qroiuqpinvrin' }
    ])
  }

  return (
    <Draggable
      id={`plant`}
      persistent
      rotates
      initialTranslation={{ x: 80, y: 10 }}
      initialRotation={0}
      component={dragProps => (
        <Pot {...dragProps} ref={potEl}>
          <Plant planted={state > 0} grown={state > 1} />
        </Pot>
      )}
    />
  )
}
