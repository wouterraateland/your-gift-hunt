import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Door } from 'your-gift-hunt/objects'

const EnhancedDoor = (props) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Door
      {...props}
      onClick={() => dispatchAction({
        entity: null,
        type: '/actions/transform',
        payload: {
          transformation: props.state === 'open' ? 'CLOSE' : 'OPEN'
        }
      })}
    />
  )
}
EnhancedDoor.entityId = Door.entityId

export default EnhancedDoor
