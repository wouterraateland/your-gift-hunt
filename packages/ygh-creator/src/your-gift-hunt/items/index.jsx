import React from "react"
import styled from "styled-components"
import S from "sanctuary"

import Battery from "./Battery"
import Flashlight from "./Flashlight"
import Map from "./Map"
import MapPiece from "./MapPiece"
import SafeKey from "./SafeKey"
import Seeds from "./Seeds"
import WateringCan from "./WateringCan"

const ItemContainer = styled.div`
  position: relative;
  z-index: 1;

  width: 2em;
  height: 2em;
`

// getItemComponent :: String -> Maybe Component
const getItemComponent = name => {
  switch (name) {
    case "Battery":
      return S.Just(Battery)
    case "Flashlight":
      return S.Just(Flashlight)
    case "Map":
      return S.Just(Map)
    case "Map piece":
      return S.Just(MapPiece)
    case "Safe key":
      return S.Just(SafeKey)
    case "Seeds":
      return S.Just(Seeds)
    case "Watering can":
      return S.Just(WateringCan)
    default:
      return S.Nothing
  }
}

const GenericItem = props =>
  S.compose(
    S.maybe_(() => props.entity.name)(Component => (
      <ItemContainer>
        <Component {...props} />
      </ItemContainer>
    ))
  )(getItemComponent)(props.entity.name)

export default GenericItem

export { Battery, Flashlight, Map, MapPiece, SafeKey, Seeds, WateringCan }
