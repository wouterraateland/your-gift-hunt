import React, { useState } from "react"
import styled from "styled-components"

import { getEntityDetailComponent } from "components/EntityDetails"
import EntityContainer from "components/EntityContainer"
import BaseScreen from "./Base"

import useGame from "hooks/useGame"
import useWindowSize from "hooks/useWindowSize"

const Navigation = styled.div`
  position: relative;
  z-index: 1;
  padding: 1em;

  text-align: center;

  color: #fff;

  & span {
    cursor: pointer;
    padding: 1em;
  }
`

const StyledEntityContainer = styled(EntityContainer)`
  position: absolute;
  top: calc(50% + 0.75em);
  left: 50%;

  transform: translate(-50%, -50%);
`

export default ({ entity, close, ...props }) => {
  const { entities } = useGame()
  const containedEntities = entities.filter(
    ({ container }) =>
      container &&
      entity.portals.some(portal => container.id === portal.entrance.entity.id)
  )

  const [entityIndex, setEntityIndex] = useState(containedEntities.length - 1)
  const { width, height, rem, orientation } = useWindowSize()

  const currentEntity =
    entityIndex === -1 ? null : containedEntities[entityIndex]

  const Component = currentEntity
    ? getEntityDetailComponent(currentEntity.template.name)
    : null

  return (
    <BaseScreen {...props}>
      <Navigation>
        {entityIndex > 0 && (
          <span onClick={() => setEntityIndex(i => i - 1)}>Previous</span>
        )}
        <span onClick={() => close()}>Close</span>
        {entityIndex < containedEntities.length - 1 && (
          <span onClick={() => setEntityIndex(i => i + 1)}>Next</span>
        )}
      </Navigation>
      {Component && (
        <StyledEntityContainer
          maxWidth={(0.8 * width) / rem - (orientation === "portrait" ? 0 : 7)}
          maxHeight={
            (0.8 * height) / rem - (orientation === "portrait" ? 10 : 3)
          }
          component={Component}
        >
          <Component {...currentEntity} />
        </StyledEntityContainer>
      )}
    </BaseScreen>
  )
}
