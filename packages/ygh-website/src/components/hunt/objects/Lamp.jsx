import React, { useContext, useRef, useEffect, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'contexts/Store'

import Draggable, { dragStyles } from 'components/Draggable'

const Lamp = memo(styled.div`
  position: relative;

  width: 10vw;
  height: 10vw;

  border-radius: 100%;

  background:
    radial-gradient(ellipse 50% 50% at 50% 50%, #212121, transparent 25%, transparent 90%, #212121),
    linear-gradient(135deg, transparent, #424242 40%),
    radial-gradient(ellipse 50% 50% at 55% 55%, transparent 80%, #fff 90%, transparent 100%);

  background-color: #424242;

  &::before, &::after {
    content: '';
    position: absolute;
  }

  &::before {
    left: 50%; top: 50%;
    z-index: 1;

    width: 20vw;
    height: 1vw;

    border-radius: .5vw;

    background-image:
      radial-gradient(ellipse 30% 20% at 75% 30%, #fff, transparent),
      radial-gradient(ellipse 75% 50% at 75% 50%, transparent, #212121);
    background-color: #424242;

    transform: translate(-.5vw, -.5vw);
  }

  &::after {
    left: calc(50% + 20vw); top: 50%;

    width: 5vw;
    height: 5vw;
    border-radius: 100%;

    background:
      radial-gradient(transparent, #212121);
    background-color: #424242;

    transform: translate(-50%, -50%);
  }

  ${dragStyles(.5)}
`)

const Light = memo(styled.div`
  pointer-events: none;
  position: absolute;
  left: calc(50% + 25vw); top: 50%;
  z-index: -1;

  opacity: ${props => props.on ? 1 : 0};

  width: 30vw;
  height: 30vw;

  background: radial-gradient(circle closest-side, rgba(249, 220, 141, 0.7) 10%, transparent);

  transform: translate(-50%, -50%);

  transition: opacity .5s ease-out;
`)

export default () => {
  const { read, write } = useContext(StoreContext)
  const lightEl = useRef(null)

  useEffect(() => {
    write('lamp', state => state
      ? state
      : {
          lampState: false,
          lightPosition: { x: 0, y: 0 }
        }
    )
  }, [])

  function handleOnClick() {
    write('lamp', state => ({
      ...state,
      lampState: !state.lampState
    }))
  }

  function setLightPosition() {
    if (lightEl.current) {
      const rect = lightEl.current.getClientRects()[0]
      write('lamp', state => ({
        ...state,
        lightPosition: {
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        }
      }))
    }
  }

  function handleOnDrag() {
    setLightPosition()
  }

  function handleOnDragEnd() {
    const interval = setInterval(setLightPosition, 0)
    setTimeout(() => clearInterval(interval), 250)
  }

  const on = read('lamp', { lampState: false }).lampState

  return (
    <Draggable
      id={`lamp`}
      persistent
      rotates
      onDrag={handleOnDrag}
      onDragEnd={handleOnDragEnd}
      initialTranslation={{ x: 45, y: 90 }}
      initialRotation={(-.5 / 6) * Math.PI}
      component={dragProps => (
        <Lamp
          {...dragProps}
          onClick={handleOnClick}
        >
          <Light
            on={on}
            ref={lightEl}
          />
        </Lamp>
      )}
    />
  )
}
