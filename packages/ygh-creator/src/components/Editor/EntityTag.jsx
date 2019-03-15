import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "./EntityTypeIcon"

const EntityTag = styled.span`
  display: inline-block;
  padding: 0.1em 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-size: smaller;

  background-color: ${props => props.theme.color.accent};
`

export default ({ entity, name, className }) => (
  <EntityTag className={className}>
    <EntityTypeIcon {...entity} /> {name || entity.name}
  </EntityTag>
)
