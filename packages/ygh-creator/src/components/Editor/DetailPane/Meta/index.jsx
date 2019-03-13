import React from "react"
import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"
import EntityTypeIcon from "components/Editor/EntityTypeIcon"
import StateTag from "components/Editor/StateTag"

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
      {state.name !== "default" && <StateTag name={state.name} />}
      <Description>
        {instance.entity.description} {state.description}
      </Description>
    </Paper.Section>
  </Paper>
)

export default Meta
