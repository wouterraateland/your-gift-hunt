import React, { useRef, useEffect, useContext } from 'react'
import { Flashlight } from 'your-gift-hunt/items'

import GameContext from 'contexts/Game'

export default (props) => {
  const powerButton = useRef(null)
  const { dispatchAction } = useContext(GameContext)

  function handleClickPowerButton() {
    dispatchAction({
      entity: props.entity,
      type: '/actions/transform',
      payload: {
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
