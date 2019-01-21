import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Door } from 'your-gift-hunt/objects'

const EnhancedDoor = (props) => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Door
      {...props}
      onClick={() => dispatchAction({
        type: 'input',
        payload: {
          instanceId: props.id,
          inputValues: {
            state: props.state === 'open' ? 'close' : 'open'
          }
        }
      })}
    />
  )
}
EnhancedDoor.entityId = Door.entityId

export default EnhancedDoor
