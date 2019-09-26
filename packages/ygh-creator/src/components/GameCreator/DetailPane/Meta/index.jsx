import React from "react"
import styled from "styled-components"

import { Paper } from "ygh-ui"
import EntityTypeIcon from "components/EntityTypeIcon"
import StateTag from "components/Primitives/StateTag"

import EditableEntityName from "./EditableEntityName"
import Container from "./Container"
import ContainedEntities from "./ContainedEntities"
import StartContainer from "./StartContainer"

const StyledPaper = styled(Paper)`
  border-radius: 0;
  border: 1px solid #0002;
  border-width: 1px 0;
  box-shadow: none;
  background-color: #fcfcfc;
`

const Name = styled.h2`
  margin: 0;

  & > svg {
    margin: 0.25em 0;
  }
`

const Description = styled.blockquote``

const Meta = ({ entity, state }) => (
  <StyledPaper>
    <Paper.Section>
      <Name>
        <EntityTypeIcon {...entity} /> <EditableEntityName entity={entity} />
      </Name>
      {state && <StateTag state={state} />}
      <Description>
        {entity.description} {state && state.description}
      </Description>
      <Container entity={entity} />
      {entity.isContainer && <ContainedEntities entity={entity} />}
      {entity.isContainer && entity.isPlaceable && (
        <StartContainer entity={entity} />
      )}
    </Paper.Section>
  </StyledPaper>
)

export default Meta
