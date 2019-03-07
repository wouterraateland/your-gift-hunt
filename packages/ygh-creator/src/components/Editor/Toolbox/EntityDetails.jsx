import React from "react"
import styled from "styled-components"

const EntityDetailsContainer = styled.div`
  overflow: hidden;

  max-height: ${props => (props.isExpanded ? 20 : 0)}em;

  blockquote {
    border-left-color: #fff2;
    color: #fffc;
  }
`

const EntityDetails = ({ isExpanded, entity }) => (
  <EntityDetailsContainer isExpanded={isExpanded}>
    <blockquote>{entity.description}</blockquote>
  </EntityDetailsContainer>
)

export default EntityDetails
