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

const TemplateSet = ({ templateSet }) => {
  return (
    <Container>
      <blockquote>{templateSet.description}</blockquote>
      <Templates>
        {templateSet.entityTemplates.map(entityTemplate => (
          <EntityTemplatePreview
            key={entityTemplate.id}
            entityTemplate={entityTemplate}
          />
        ))}
      </Templates>
    </Container>
  )
}

export default TemplateSet
