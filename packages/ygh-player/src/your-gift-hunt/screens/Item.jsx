import React from "react"
import styled from "styled-components"

import Screen from "./Screen"

const ItemContainer = styled.div`
  position: relative;
  text-align: center;

  & > h2 {
    color: #fff;
    margin-bottom: 12em;
  }

  & > div {
    font-size: 6em;
  }
`

const ItemScreen = ({ isVisible, entity, component: Component, close }) => {
  return (
    <Screen isVisible={isVisible} onClick={close} centerContent>
      <ItemContainer>
        <h2>{entity.name}</h2>
        <Component />
      </ItemContainer>
    </Screen>
  )
}

export default ItemScreen
