import React from "react"
import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"
import EntityTypeIcon from "components/Editor/EntityTypeIcon"
import StateTag from "components/Editor/StateTag"

import EditableEntityName from "./EditableEntityName"

const Name = styled.h2`
  margin: 0 0 0.25em;
  line-height: 1;
`

const Description = styled.blockquote``

const Meta = ({ node: { entity, state } }) => (
  <Paper>
    <Paper.Section>
      <Name>
        <EntityTypeIcon {...entity} /> <EditableEntityName entity={entity} />
      </Name>
      {state.name && <StateTag name={state.name} />}
      <Description>
        {entity.description} {state.description}
      </Description>
    </Paper.Section>
  </Paper>
)

export default Meta
