import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Mailbox } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction, state } = useContext(GameContext)
  const { notes } = state

  return (
    <Mailbox
      {...props}
      onReadNote={(instanceId) => {
        dispatchAction({
          type: '/actions/act',
          payload: { instanceId },
        })
      }}
      instances={[...notes]}
    />
  )
}
