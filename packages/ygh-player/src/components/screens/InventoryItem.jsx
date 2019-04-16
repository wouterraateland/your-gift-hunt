import React from "react"
import styled from "styled-components"

import Base from "./Base"
import { GenericEntityDetail } from "../entityDetails"

const InventoryItemScreen = styled(Base)``

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

export default ({ entity, ...props }) => (
  <InventoryItemScreen {...props}>
    <ItemContainer>
      <GenericEntityDetail {...entity} />
    </ItemContainer>
    <h2>{entity.name}</h2>
  </InventoryItemScreen>
)
