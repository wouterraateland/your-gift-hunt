import React from "react"
import styled, { css, keyframes } from "styled-components"

import BaseScreen from "./Base"
import { getEntityComponent } from "your-gift-hunt/entities"
import EntityContainer from "components/EntityContainer"

const animationKeyframes = {
  fromLeft: keyframes`
    from { opacity: 0; transform: translate(-50%, 0); }
    to { opacity: 1; transform: translate(0, 0); }
  `,
  fromRight: keyframes`
    from { opacity: 0; transform: translate(50%, 0); }
    to { opacity: 1; transform: translate(0, 0); }
  `,
  grow: keyframes`
    from { box-shadow: 0 0 0 0 #000; }
    to { box-shadow: 0 0 5em 5em #000; }
  `
}

const animations = {
  fromLeft: css`
    animation: ${animationKeyframes.fromLeft} 1s cubic-bezier(0.25, 0, 0.25, 1)
      forwards;
  `,
  fromRight: css`
    animation: ${animationKeyframes.fromRight} 1s cubic-bezier(0.25, 0, 0.25, 1)
      forwards;
  `,
  grow: css`
    animation: ${animationKeyframes.grow} 1s cubic-bezier(0.25, 0, 0.25, 1)
      forwards;
  `
}

const ItemPickupScreen = styled(BaseScreen)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledEntityContainer = styled(EntityContainer)`
  z-index: 2;
  will-change: transform, opacity;
  ${animations.fromLeft}
`

const Details = styled.div`
  position: relative;
  z-index: 1;

  margin-left: 2em;

  will-change: transform, opacity;
  ${animations.fromRight}

  &::before {
    content: "";

    position: absolute;
    top: 50%;
    left: -9em;
    right: 0;
    z-index: -1;

    border-radius: 100%;
    will-change: box-shadow;
    ${animations.grow}
  }
`

const Message = styled.p`
  position: relative;
  margin-top: 0;

  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff;

  &::after {
    content: "";
    position: absolute;
    top: 2.25em;
    left: 0;
    right: 0;

    height: 0.1em;

    box-shadow: inset -0.05em -0.05em 0.1em #0009, 0.05em 0.05em 0.1em #0009;

    background: #fff;
  }
`

const EntityName = styled.p`
  margin-bottom: 0;

  font-size: 1.5em;
  font-family: ${props => props.theme.font.heading};

  color: #ffd666;
`

export default ({ entity, ...props }) => {
  const Component = getEntityComponent(entity.template.name)
  return (
    <ItemPickupScreen {...props}>
      <StyledEntityContainer maxWidth={6} maxHeight={6} component={Component}>
        <Component {...entity} />
      </StyledEntityContainer>
      <Details>
        <Message>Inventory item found</Message>
        <EntityName>{entity.name}</EntityName>
      </Details>
    </ItemPickupScreen>
  )
}
