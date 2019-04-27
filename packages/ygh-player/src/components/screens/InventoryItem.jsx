import React from "react"
import styled from "styled-components"

import Base from "./Base"
import { getEntityDetailComponent } from "../EntityDetails"
import EntityContainer from "components/EntityContainer"

const InventoryItemScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const EntityName = styled.h2`
  position: absolute;
  left: 50%;
  bottom: 1em;

  color: #ffd666;

  transform: translate(-50%, 0);

  &::before {
    content: "";
    position: absolute;
    top: -0.5em;
    left: -1em;
    right: -1em;

    height: 0.1em;

    background: #fff;
    box-shadow: inset -0.05em -0.05em 0.1em #0004;
  }

  & small {
    font-size: 0.75em;
    vertical-align: bottom;
  }
`

export default ({ entity, ...props }) => {
  const Component = getEntityDetailComponent(entity.template.name)

  return (
    <InventoryItemScreen {...props}>
      <EntityContainer maxWidth={12} maxHeight={12} component={Component}>
        <Component {...entity} />
      </EntityContainer>
      <EntityName>
        {entity.name}
        {entity.state.name && <small> – {entity.state.name}</small>}
      </EntityName>
    </InventoryItemScreen>
  )
}
