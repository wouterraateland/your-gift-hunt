import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Note } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Note
      {...props}
      onReadNote={(entity) => {
        dispatchAction({
          entity,
          type: '/actions/act',
          payload: {},
        })
      }}
    />
  )
}
