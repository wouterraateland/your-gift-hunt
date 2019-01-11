import React from 'react'
import styled from 'styled-components'

import * as _Battery from './Battery'
import * as _Flashlight from './Flashlight'
import * as _SafeKey from './SafeKey'
import * as _Seeds from './Seeds'
import * as _WateringCan from './WateringCan'

const Item = styled.div`

`

const createItem = (Component, id) => (props) => {
  const item = { id }

  return (
    <Item item={item}>
      <Component {...props} />
    </Item>
  )
}

export default createItem

export const Battery = createItem(_Battery.default, _Battery.itemId)
export const Flashlight = createItem(_Flashlight.default, _Flashlight.itemId)
export const SafeKey = createItem(_SafeKey.default, _SafeKey.itemId)
export const Seeds = createItem(_Seeds.default, _Seeds.itemId)
export const WateringCan = createItem(_WateringCan.default, _WateringCan.itemId)
