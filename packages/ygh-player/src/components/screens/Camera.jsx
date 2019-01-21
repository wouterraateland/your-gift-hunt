import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Camera } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction, instances: { codes } } = useContext(GameContext)

  return (
    <Camera
      {...props}
      onScanCode={(code) => {
        dispatchAction({
          type: 'scan',
          payload: { code },
        })
      }}
      instances={[...codes]}
    />
  )
}
