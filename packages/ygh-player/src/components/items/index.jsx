import React from 'react'
import styled from 'styled-components'

import * as _Battery from './Battery'
import * as _Flashlight from './Flashlight'
import * as _SafeKey from './SafeKey'
import * as _Seeds from './Seeds'
import * as _WateringCan from './WateringCan'

const ItemContainer = styled.div`
  position: relative;
  z-index: 1;

  width: 2em;
  height: 2em;
`

const createItem = ({ default: Component, itemId: id }) => props => {
  const item = { id }

  return (
    <ItemContainer item={item}>
      <Component {...props} />
    </ItemContainer>
  )
}

export const Battery = createItem(_Battery)
export const Flashlight = createItem(_Flashlight)
export const SafeKey = createItem(_SafeKey)
export const Seeds = createItem(_Seeds)
export const WateringCan = createItem(_WateringCan)

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

const Item = ({ entity, ...props }) => {
  const Component = getItemComponent(entity)

  return Component
    ? <Component {...props} />
    : <ItemContainer>{entity}</ItemContainer>
}

export default Item
