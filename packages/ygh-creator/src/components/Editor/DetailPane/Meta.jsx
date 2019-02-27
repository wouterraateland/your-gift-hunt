import React from "react"
import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"
import EntityTypeIcon from "../EntityTypeIcon"
import StateTag from "../StateTag"

const Name = styled.h2`
  margin: 0 0 0.25em;
`

const Description = styled.blockquote``

const Meta = ({
  node: {
    instance: { entity },
    state: { state }
  }
}) => (
  <Paper>
    <Paper.Section>
      <Name>
        <EntityTypeIcon {...entity} /> {entity.name}
      </Name>
      <StateTag>{state.name}</StateTag>
      <Description>
        {entity.description} {state.description}
      </Description>
    </Paper.Section>
  </Paper>
)

export default Meta
