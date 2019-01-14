import React, { useContext } from 'react'
import StoreContext from 'contexts/store'

import Align from 'components/ui/Align'
import Overlay from 'components/ui/Overlay'

import Board from 'components/objects/Board'

export default () => {
  const { read, write } = useContext(StoreContext)
  const selectedBoardId = read('selectedBoardId', null)
  const boards = read('boards', [])
  const board = boards.find(board => board.id === selectedBoardId)

  const pieces = read('pieces', [])
  const isCleared = board && board.pieceIds.every(pieceId => {
    const piece = pieces.find(piece => piece.id === pieceId)
    return piece && piece.challenge.completed
  })

  return (
    <Overlay
      visible={board !== undefined}
    >
      <Overlay.Inner>
        <Align.Center>
          <p onClick={() => write('selectedBoardId', null)}>Sluit</p>
          {board !== undefined &&
            <>
              <Board
                {...board}
                displayWidth={5}
                displayHeight={5}
              />
              {isCleared && <p>{board.description}</p>}
            </>
          }
        </Align.Center>
      </Overlay.Inner>
    </Overlay>
  )
}
