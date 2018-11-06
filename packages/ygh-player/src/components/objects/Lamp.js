import React, { useContext, useRef, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

import Draggable, { dragStyles } from 'components/Draggable'

import code from 'assets/code.svg'

const Lamp = styled.div`
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
`

const Light = styled.div`
  position: absolute;
  left: calc(50% + 25vw); top: 50%;
  z-index: -1;

  opacity: ${props => props.on ? 1 : 0};

  width: 30vw;
  height: 30vw;

  background: rgba(249, 220, 141, 0.7) url(${code}) no-repeat 60vw 20vh fixed;

  mask-image: radial-gradient(circle closest-side, #fff 10%, transparent);

  transform: translate(-50%, -50%);

  transition: opacity .5s ease-out;
`

const Code = styled.div`
  position: absolute;
  left: 30vw; top: 0;

  width: 30vw;
  height: 30vw;

  opacity: ${props => props.visible ? 1 : 0};

  mask: radial-gradient(circle closest-side, #fff 10%, transparent) no-repeat 30vw 30vw;

  background: url(${code}) no-repeat center / 10vw;
`

export default () => {
  const { read, write } = useContext(StoreContext)
  const lightEl = useRef(null)
  const codeEl = useRef(null)

  function handleOnClick() {
    write('lampState', state => !state)
  }

  function setMaskPosition() {
    if (lightEl.current && codeEl.current) {
      const rect = lightEl.current.getClientRects()[0]
      codeEl.current.style =
        `-webkit-mask-position: calc(${rect.x + rect.width / 2}px - 45vw) calc(${rect.y + rect.height / 2}px - 15vw)`
    }
  }

  function handleOnDrag() {
    setMaskPosition()
  }

  function handleOnDragEnd() {
    const interval = setInterval(setMaskPosition, 0)
    setTimeout(() => clearInterval(interval), 250)
  }

  const on = read('lampState', false)

  return (
    <>
      <Code
        visible={on}
        ref={codeEl}
      />
      <Draggable
        id={`lamp`}
        persistent
        rotates
        onDrag={handleOnDrag}
        onDragEnd={handleOnDragEnd}
        initialTranslation={{ x: 45, y: 90 }}
        initialRotation={(-.5 / 6) * Math.PI}
        component={memo(dragProps => (
          <Lamp
            {...dragProps}
            onClick={handleOnClick}
          >
            <Light
              on={on}
              ref={lightEl}
            />
          </Lamp>
        ))}
      />
    </>
  )
}
