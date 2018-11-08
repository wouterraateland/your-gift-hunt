import React, { useContext, memo } from 'react'
import styled from 'styled-components'

import StoreContext from 'context/Store'

import Camera from 'components/objects/Camera'
import Carpet from 'components/objects/Carpet'
import Chair from 'components/objects/Chair'
import Code from 'components/objects/Code'
import Floor from 'components/objects/Floor'
import Lamp from 'components/objects/Lamp'
import Piece from 'components/objects/Piece'
import Plant from 'components/objects/Plant'
import Puzzle from 'components/objects/Puzzle'
import Safe from 'components/objects/Safe'
import Seed from 'components/objects/Seed'

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
      <Code />
      <Carpet />
      {boards.map(board => <Puzzle key={board.id} {...board} />)}
      {pieces
        .filter(piece => piece.challenge.type === 'question' && !piece.challenge.completed)
        .map(piece => <Piece key={piece.id} {...piece} />)}
      <Camera />
      <Safe />
      <Plant />
      {read('plant', 0) === 0 && <Seed />}
      <Chair />
      <Lamp />
      <LightMap />
    </Playground>
  )
})
