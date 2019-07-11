import React from "react"
import styled from "styled-components"

import { Paper, VSpace } from "ygh-ui"
import EntityTypeIcon from "components/EntityTypeIcon"
import StateTag from "components/Primitives/StateTag"

import EditableEntityName from "./EditableEntityName"
import Container from "./Container"
import ContainedEntities from "./ContainedEntities"
import StartContainer from "./StartContainer"

const Name = styled.h2`
  margin: 0 0 0.25em;
  line-height: 1;
`

const Description = styled.blockquote``

const Meta = ({ entity, state }) => (
  <Paper>
    <Paper.Section>
      <Name>
        <EntityTypeIcon {...entity} /> <EditableEntityName entity={entity} />
      </Name>
      {state && <StateTag state={state} />}
      <Description>
        {entity.description} {state && state.description}
      </Description>
      <VSpace.Small />
      <Container entity={entity} />
      {entity.isContainer && <ContainedEntities entity={entity} />}
      {entity.isContainer && entity.isObject && (
        <StartContainer entity={entity} />
      )}
    </Paper.Section>
  </Paper>
)

export default Meta
