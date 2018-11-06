import React, { useContext, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

import Draggable, { dragStyles } from 'components/Draggable'

const Safe = styled.div`
  position: relative;

  width: 20vw;
  height: 20vw;
  border: 1vw solid #263238;
  border-radius: 1vw;

  background-color: #37474F;

  &::before, &::after {
    content: '';

    position: absolute;
    left: 50%;

    transform: translate(-50%, 0);
  }

  &::before {
    top: -1.5vw;

    width: 1vw;
    height: .5vw;

    background-color: #37474F;
  }

  &::after {
    top: -2.5vw;

    width: 8vw;
    height: 1vw;
    border-radius: .5vw;

    background-color: #263238;
  }

  ${dragStyles(1.5)}
`

export default () => {
  const { write } = useContext(StoreContext)

  function handleOnClick() {
    write('selectedPieceId', 5)
  }

  return (
    <Draggable
      id={`safe`}
      persistent
      rotates
      initialTranslation={{ x: 15, y: 10 }}
      initialRotation={(5 / 6) * Math.PI}
      component={memo(dragProps => (
        <Safe
          {...dragProps}
          onClick={handleOnClick}
        />
      ))}
    />
  )
}
