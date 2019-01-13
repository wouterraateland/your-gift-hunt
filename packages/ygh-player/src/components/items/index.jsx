import React from 'react'
import styled from 'styled-components'

import * as _Battery from './Battery'
import * as _Flashlight from './Flashlight'
import * as _SafeKey from './SafeKey'
import * as _Seeds from './Seeds'
import * as _WateringCan from './WateringCan'

const Item = styled.div`

`

const createItem = ({ default: Component, itemId: id }) => props => {
  const item = { id }

  return (
    <Item item={item}>
      <Component {...props} />
    </Item>
  )
}

export default createItem

export const Battery = createItem(_Battery)
export const Flashlight = createItem(_Flashlight)
export const SafeKey = createItem(_SafeKey)
export const Seeds = createItem(_Seeds)
export const WateringCan = createItem(_WateringCan)
