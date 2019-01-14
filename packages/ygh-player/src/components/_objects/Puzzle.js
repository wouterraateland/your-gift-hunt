import React, { useContext } from 'react'

import StoreContext from 'contexts/store'

import Draggable from 'components/Draggable'

import Board from 'components/objects/Board'

const Puzzle = boardProps => {
  const { write } = useContext(StoreContext)

  function handleOnClick() { write('selectedBoardId', boardProps.id) }

  return (
    <Draggable
      id={`board-${boardProps.id}`}
      persistent
      rotates
      initialTranslation={{ x: 20 + 60 * Math.random(), y: 20 + 50 * Math.random() }}
      initialRotation={2 * Math.PI * Math.random()}
      component={dragProps => (
        <Board
          {...dragProps}
          onClick={handleOnClick}
          {...boardProps}
        />
      )}
    />
  )
}

export default Puzzle
