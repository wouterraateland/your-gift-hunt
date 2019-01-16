import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Mailbox } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction, state } = useContext(GameContext)
  const { notes } = state

  return (
    <Mailbox
      {...props}
      onReadNote={(entity) => {
        dispatchAction({
          entity,
          type: '/actions/act',
          payload: {},
        })
      }}
      entities={[...notes]}
    />
  )
}
