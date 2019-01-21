import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Note } from 'your-gift-hunt/screens'

export default ({ instanceId, ...props }) => {
  const { dispatchAction, instances: { all } } = useContext(GameContext)
  const instance = all.find(instance => instance.id === instanceId)

  return (
    <Note
      {...props}
      instance={instance}
      onReadNote={(instanceId) => {
        dispatchAction({
          type: 'input',
          payload: {
            instanceId,
            inputValues: {}
          },
        })
      }}
    />
  )
}
