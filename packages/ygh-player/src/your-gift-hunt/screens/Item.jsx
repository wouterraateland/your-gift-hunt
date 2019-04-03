import React from "react"
import styled from "styled-components"

import Screen from "./Screen"

const ItemContainer = styled.div`
  position: relative;
  text-align: center;

  & > h2 {
    color: #fff;
  }

  & > div {
    font-size: 6em;
  }
`

const ItemScreen = ({ isVisible, instance, component: Component, close }) => {
  return (
    <Screen isVisible={isVisible} onClick={close} centerContent>
      <ItemContainer>
        <h2>{instance.name}</h2>
        <Component />
      </ItemContainer>
    </Screen>
  )
}

export default ItemScreen
