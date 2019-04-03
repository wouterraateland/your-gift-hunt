import React from "react"
import styled from "styled-components"

import Battery from "./Battery"
import Flashlight from "./Flashlight"
import SafeKey from "./SafeKey"
import Seeds from "./Seeds"
import WateringCan from "./WateringCan"

const ItemContainer = styled.div`
  position: relative;
  z-index: 1;

  width: 2em;
  height: 2em;
`

const getItemComponent = itemName => {
  switch (itemName) {
    case "Battery":
      return Battery
    case "Flashlight":
      return Flashlight
    case "Safe key":
      return SafeKey
    case "Seeds":
      return Seeds
    case "Watering can":
      return WateringCan
    default:
      return null
  }
}

const Item = props => {
  const Component = getItemComponent(props.template.name)

  return (
    <ItemContainer>
      {Component ? <Component {...props} /> : props.template.name}
    </ItemContainer>
  )
}

export default Item

export { Battery, Flashlight, SafeKey, Seeds, WateringCan }
