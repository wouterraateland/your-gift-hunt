import React, { useContext, memo } from 'react'
import styled, { css } from 'styled-components'

import StoreContext from 'contexts/store'

import { dragStyles } from 'components/Draggable'

export const Board = memo(styled.div`
  touch-action: none;

  position: relative;

  display: inline-block;
  width: ${props => 4 + 10 * (props.displayWidth || props.width)}vw;
  height: ${props => 4 + 10 * (props.displayHeight || props.height)}vw;
  border: 2vw solid #BCAAA4;
  border-radius: 2vw;

  background-color: #8D6E63;

  &::after {
    content: '';
    position: absolute;
    left: 0; top: 0;
    right: 0; bottom: 0;

    box-shadow: inset .5vw .5vw .5vw 0 rgba(0, 0, 0, .1);
  }

  ${props => props.cleared && css`
    border-color: #ffeb3b;
  `}

  ${dragStyles(.5)}
`)

Board.displayName = 'Board'

const Slot = memo(styled.div`
  float: left;
  width: ${props => props.slotWidth}%;
  height: ${props => props.slotHeight}%;

  ${props => props.challengeCompleted && css`
    background: url(${props.bgImage}) no-repeat center / cover;
  `}
`)
Slot.displayName = 'Slot'

const Slots = memo(({ pieces, ...slotProps }) => pieces.map(piece =>
  <Slot
    key={piece.id}
    bgImage={piece.image}
    challengeCompleted={piece.challenge.completed}
    {...slotProps}
  />
))

export default ({ pieceIds, ...boardProps }) => {
  const { read } = useContext(StoreContext)
  const pieces = read('pieces', [])
    .filter(piece => pieceIds.includes(piece.id))
  const cleared =
    pieces.every(piece => piece.challenge.completed) &&
    pieces.length === pieceIds.length

  return (
    <Board {...boardProps} cleared={cleared}>
      <Slots
        pieces={pieces}
        slotWidth={100 / boardProps.width}
        slotHeight={100 / boardProps.height}
      />
    </Board>
  )
}
