import React, { useState } from "react"
import styled from "styled-components"

import { Float } from "your-gift-hunt/ui"
import { GenericEntityDetail } from "components/entityDetails"
import BaseScreen from "./Base"

const MultiDetailScreen = styled(BaseScreen)``

const Navigation = styled.div`
  padding: 2em;

  color: #fff;

  & span {
    cursor: pointer;
  }
`

export default ({ entity, ...props }) => {
  const [entityIndex, setEntityIndex] = useState(0)

  const currentEntity =
    entityIndex === -1 ? null : entity.containedEntities[entityIndex]

  return (
    <MultiDetailScreen {...props}>
      <Navigation>
        {entityIndex > 0 && (
          <Float.Left>
            <span onClick={() => setEntityIndex(i => i - 1)}>Previous</span>
          </Float.Left>
        )}
        {entityIndex < entity.containedEntities.length - 1 && (
          <Float.Right>
            <span onClick={() => setEntityIndex(i => i + 1)}>Next</span>
          </Float.Right>
        )}
      </Navigation>
      <GenericEntityDetail {...currentEntity} />
    </MultiDetailScreen>
  )
}
