import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Camera } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction, state } = useContext(GameContext)
  const { codes } = state

  return (
    <Camera
      {...props}
      onScanCode={(code) => {
        dispatchAction({
          type: '/actions/scan',
          payload: { code },
        })
      }}
      instances={[...codes]}
    />
  )
}
