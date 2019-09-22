import React from "react"
import styled from "styled-components"

import EntityTemplatePreview from "./EntityTemplatePreview"

const Container = styled.div`
  padding: 0.5rem;
  border-top: 1px solid #0002;
  background-color: #fcfcfc;
`

const Templates = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const TemplateSet = ({ templateSet, onEntityTemplateClick }) => (
  <Container>
    <blockquote>{templateSet.description}</blockquote>
    <Templates>
      {templateSet.entityTemplates.length ? (
        templateSet.entityTemplates.map(entityTemplate => (
          <EntityTemplatePreview
            onClick={() => onEntityTemplateClick(entityTemplate.id)}
            key={entityTemplate.id}
            entityTemplate={entityTemplate}
          />
        ))
      ) : (
        <em>No entities found</em>
      )}
    </Templates>
  </Container>
)

export default TemplateSet
