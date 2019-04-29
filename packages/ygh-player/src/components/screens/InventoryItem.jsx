import React from "react"
import styled from "styled-components"

import useWindowSize from "hooks/useWindowSize"

import { getEntityDetailComponent } from "components/EntityDetails"
import EntityContainer from "components/EntityContainer"
import Base from "./Base"

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

const StyledEntityContainer = styled(EntityContainer)`
  position: absolute;
  top: calc(50% - 1.5em);
  left: 50%;

  transform: translate(-50%, -50%);
`

export default ({ entity, ...props }) => {
  const { width, height, rem, orientation } = useWindowSize()
  const Component = getEntityDetailComponent(entity.template.name)

  return (
    <InventoryItemScreen {...props}>
      <StyledEntityContainer
        component={Component}
        maxWidth={(0.5 * width) / rem - (orientation === "portrait" ? 0 : 7)}
        maxHeight={(0.5 * height) / rem - (orientation === "portrait" ? 11 : 4)}
      >
        <Component {...entity} />
      </StyledEntityContainer>
      <EntityName>
        {entity.name}
        {entity.state.name && <small> – {entity.state.name}</small>}
      </EntityName>
    </InventoryItemScreen>
  )
}
