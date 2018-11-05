import React, { useContext, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

import Draggable, { dragStyles } from 'components/Draggable'

const Piece = styled.div`
  position: relative;
  overflow: hidden;

  width: 20vw;
  height: 12vw;
  border-radius: .5vw;

  background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    left: 50%; top: 0;

    width: 13vw;
    height: 13vw;
    border-bottom-right-radius: 1vw;

    box-shadow: 0rem 0rem .5rem rgba(0, 0, 0, .2);

    transform: translate(-50%, -50%) rotate(45deg) skew(-10deg, -10deg);
  }

  ${dragStyles(.5)}
`

Piece.displayName = 'Piece'

export default ({ id, ...pieceProps }) => {
  const { write } = useContext(StoreContext)

  function handleOnClick() { write('selectedPieceId', id) }

  return (
    <Draggable
      id={`Piece-${id}`}
      persistent
      rotates
      initialTranslation={{
        x: 10 + 80 * Math.random(),
        y: 10 + 70 * Math.random(),
      }}
      initialRotation={2 * Math.PI * Math.random()}
      component={memo(dragProps => (
        <Piece
          {...dragProps}
          onClick={handleOnClick}
          {...pieceProps}
        />
      ))}
    />
  )
}
