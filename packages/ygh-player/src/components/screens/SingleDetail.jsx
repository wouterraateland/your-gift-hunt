import React from "react"
import styled from "styled-components"

import { useWindowSize } from "ygh-hooks"

import {
  DefaultEntityDetail,
  getEntityDetailComponent
} from "components/EntityDetails"
import EntityContainer from "components/EntityContainer"
import BaseScreen from "./Base"

const StyledEntityContainer = styled(EntityContainer)`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`

export default ({ entity, ...props }) => {
  const { width, height, rem, orientation } = useWindowSize()
  const Component =
    getEntityDetailComponent(entity.template.name) || DefaultEntityDetail

  return (
    <BaseScreen {...props}>
      <StyledEntityContainer
        maxWidth={(0.8 * width) / rem - (orientation === "portrait" ? 0 : 7)}
        maxHeight={(0.8 * height) / rem - (orientation === "portrait" ? 7 : 0)}
        component={Component}
      >
        <Component {...entity} />
      </StyledEntityContainer>
    </BaseScreen>
  )
}
