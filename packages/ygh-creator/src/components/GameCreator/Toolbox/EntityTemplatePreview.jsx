import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "components/EntityTypeIcon"
import EntityPreview from "components/Primitives/EntityPreview"

const Container = styled.div`
  cursor: pointer;

  display: inline-flex;
  flex-direction: column;
  align-items: center;

  width: 4rem;
  padding: 0.5rem 0;
`

const Inner = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;

  border-radius: 100%;
  background-color: #0001;
`

const EntityTypeIconContainer = styled.div`
  position: absolute;
  left: -0.5rem;
  top: -0.5rem;
  z-index: 1;

  border: 1px solid;
  padding: calc(0.25rem - 1px);
  border-radius: 100%;

  line-height: 1;

  background-color: #fcfcfc;
`

const EntityName = styled.small`
  text-align: center;
`

const EntityTemplatePreview = ({ entityTemplate, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Inner>
        <EntityTypeIconContainer>
          <EntityTypeIcon {...entityTemplate} />
        </EntityTypeIconContainer>
        <EntityPreview entity={entityTemplate} maxWidth={2} maxHeight={2} />
      </Inner>
      <EntityName>{entityTemplate.name}</EntityName>
    </Container>
  )
}

export default EntityTemplatePreview
