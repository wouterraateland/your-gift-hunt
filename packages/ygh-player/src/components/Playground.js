import React, { useContext, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

import Floor from 'components/objects/Floor'
import Carpet from 'components/objects/Carpet'
import Puzzle from 'components/objects/Puzzle'
import Piece from 'components/objects/Piece'
import Camera from 'components/objects/Camera'
import Safe from 'components/objects/Safe'
import Chair from 'components/objects/Chair'
import Lamp from 'components/objects/Lamp'

import LightMap from 'components/LightMap'

const Playground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;

  overflow: hidden;
`

export default memo(() => {
  const { read } = useContext(StoreContext)
  const pieces = read('pieces', [])
  const boards = read('boards', [])

  return (
    <Playground>
      <Floor />
      <Carpet />
      {boards.map(board => <Puzzle key={board.id} {...board} />)}
      {pieces
        .filter(piece => piece.challenge.type === 'question' && !piece.challenge.completed)
        .map(piece => <Piece key={piece.id} {...piece} />)}
      <Camera />
      <Safe />
      <Chair />
      <Lamp />
      <LightMap />
    </Playground>
  )
})
