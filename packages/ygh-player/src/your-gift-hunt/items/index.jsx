import React from 'react'
import styled from 'styled-components'

import Battery from './Battery'
import Flashlight from './Flashlight'
import SafeKey from './SafeKey'
import Seeds from './Seeds'
import WateringCan from './WateringCan'

const ItemContainer = styled.div`
  position: relative;
  z-index: 1;

  width: 2em;
  height: 2em;
`

const getItemComponent = (item) => {
  switch (item) {
    case '/entities/battery': return Battery
    case '/entities/flashlight': return Flashlight
    case '/entities/safe-key': return SafeKey
    case '/entities/seeds': return Seeds
    case '/entities/watering-can': return WateringCan
    default: return null
  }
}

const Item = (props) => {
  const Component = getItemComponent(props.entity.id)

  return (
    <ItemContainer>
      {Component
        ? <Component {...props} />
        : props.entity.id}
    </ItemContainer>
  )
}

export default Item

export {
  Battery,
  Flashlight,
  SafeKey,
  Seeds,
  WateringCan
}
