import React, { useContext, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'contexts/Store'

import Draggable, { dragStyles } from 'components/Draggable'

const Camera = memo(styled.div`
  position: relative;

  width: 6vw;
  height: 5vw;
  border-radius: .5vw .5vw 1vw 1vw / .5vw .5vw 4vw 4vw;

  transform-origin: center bottom;

  background-color: #263238;
  background-image:
    radial-gradient(ellipse 10% 80% at 30% 10%, rgba(255, 255, 255, .8), transparent),
    radial-gradient(ellipse 40% 100% at 40% 0, rgba(255, 255, 255, .5), transparent);

  &::before, &::after {
    content: '';
    position: absolute;
  }

  /* The lens */
  &::before {
    width: 14vw;
    height: 4vw;

    border-radius: 1.5vw;

    background-color: #263238;
    background-image:
      linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, .2) 50%),
      linear-gradient(-45deg, transparent 50%, rgba(255, 255, 255, .2) 50%);
    background-size: 20% 100%, 20% 100%;

    left: -4vw;
    top: 5vw;
  }

  /* The button */
  &::after {
    right: -2.5vw;
    top: 6.5vw;

    width: 2vw;
    height: 1vw;
    border-radius: .5vw;

    box-shadow: .5vw .5vw .5vw -.25vw rgba(0, 0, 0, .2);

    background-color: #f44336;
  }

  ${dragStyles(1)}
`)

export default () => {
  const { write } = useContext(StoreContext)

  function handleOnClick() { write('cameraOpened', true) }

  return (
    <Draggable
      id={`camera`}
      persistent
      rotates
      initialTranslation={{ x: 10, y: 90 }}
      initialRotation={(1 / 6) * Math.PI}
      component={dragProps => (
        <Camera
          {...dragProps}
          onClick={handleOnClick}
        />
      )}
    />
  )
}
