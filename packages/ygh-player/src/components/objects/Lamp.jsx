import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Lamp } from 'your-gift-hunt/objects'

const EnhancedLamp = ({ entity, ...props }) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Lamp
      {...props}
      onClick={() => dispatchAction({
        entity: entity && entity.id,
        type: '/actions/transform',
        payload: {
          transformation: 'TOGGLE_POWER'
        }
      })}
    />
  )
}
EnhancedLamp.entityId = Lamp.entityId

export default EnhancedLamp
