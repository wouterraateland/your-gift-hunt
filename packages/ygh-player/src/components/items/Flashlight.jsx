import React, { useRef, useEffect, useContext } from 'react'
import { Flashlight } from 'your-gift-hunt/items'

import GameContext from 'contexts/Game'

export default (props) => {
  const powerButton = useRef(null)
  const { dispatchAction } = useContext(GameContext)

  function handleClickPowerButton() {
    dispatchAction({
      type: '/actions/transform',
      payload: {
        instanceId: props.id,
        transformation: 'TOGGLE_POWER'
      }
    })
  }

  useEffect(() => {
    powerButton.current.addEventListener('click', handleClickPowerButton)

    return () => {
      powerButton.current.removeEventListener('click', handleClickPowerButton)
    }
  }, [])

  return (
    <Flashlight
      {...props}
      ref={{
        powerButton
      }}
    />
  )
}
