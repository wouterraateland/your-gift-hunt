import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Lamp } from 'your-gift-hunt/objects'

const EnhancedLamp = (props) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Lamp
      {...props}
      onClick={() => dispatchAction({
        type: '/actions/transform',
        payload: {
          instanceId: props.id,
          transformation: 'TOGGLE_POWER'
        }
      })}
    />
  )
}
EnhancedLamp.entityId = Lamp.entityId

export default EnhancedLamp
