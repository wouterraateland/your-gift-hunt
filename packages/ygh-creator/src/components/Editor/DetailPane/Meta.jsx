import React from "react"
import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"
import EntityTypeIcon from "../EntityTypeIcon"
import StateTag from "../StateTag"
import EditableInstanceName from "./EditableInstanceName"

const Name = styled.h2`
  margin: 0 0 0.25em;
`

const Description = styled.blockquote``

const Meta = ({
  node: {
    instance,
    state: { state }
  }
}) => (
  <Paper>
    <Paper.Section>
      <Name>
        <EntityTypeIcon {...instance.entity} />{" "}
        <EditableInstanceName instance={instance} />
      </Name>
      <StateTag>{state.name}</StateTag>
      <Description>
        {instance.entity.description} {state.description}
      </Description>
    </Paper.Section>
  </Paper>
)

export default Meta
