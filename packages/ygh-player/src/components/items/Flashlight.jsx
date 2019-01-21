import React, { useRef, useEffect, useContext } from 'react'
import { Flashlight } from 'your-gift-hunt/items'

import acceptDrop from 'hooks/acceptDrop'
import GameContext from 'contexts/Game'

export default (props) => {
  const powerButton = useRef(null)
  const body = useRef(null)

  const { dispatchAction } = useContext(GameContext)

  function handleClickPowerButton() {
    dispatchAction({
      type: 'input',
      payload: {
        instanceId: props.id,
        inputValues: {
          power: props.state === 'off' ? 'on' : 'off'
        }
      }
    })
  }

  useEffect(() => {
    powerButton.current.addEventListener('click', handleClickPowerButton)

    return () => {
      powerButton.current.removeEventListener('click', handleClickPowerButton)
    }
  }, [])

  acceptDrop({
    element: body,
    instance: props,
    items: [
      {
        item: { entityId: 'battery', stateId: 'default' },
        target: { entityId: 'flashlight', stateId: 'empty' },
      }
    ]
  })

  return (
    <Flashlight
      {...props}
      ref={{
        body,
        powerButton
      }}
    />
  )
}
