import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Mailbox } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction, instances: { notes } } = useContext(GameContext)

  return (
    <Mailbox
      {...props}
      onReadNote={(instanceId) => {
        dispatchAction({
          type: 'input',
          payload: {
            instanceId,
            inputValues: {},
          },
        })
      }}
      instances={[...notes]}
    />
  )
}
