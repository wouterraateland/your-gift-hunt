import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Lamp } from 'your-gift-hunt/objects'

const EnhancedLamp = (props) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Lamp
      {...props}
      onClick={() => dispatchAction({
        type: 'input',
        payload: {
          instanceId: props.id,
          inputValues: {
            power: props.state === 'on' ? 'off' : 'on'
          }
        }
      })}
    />
  )
}
EnhancedLamp.entityId = Lamp.entityId

export default EnhancedLamp
