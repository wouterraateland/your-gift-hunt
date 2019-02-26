import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "./EntityTypeIcon"

const EntityTag = styled.span`
  display: inline-block;
  padding: 0.1em 0.5em;

  font-size: smaller;

  background-color: ${props => props.theme.color.accent};
`

export default ({ name, ...otherProps }) => (
  <EntityTag>
    <EntityTypeIcon {...otherProps} /> {name}
  </EntityTag>
)
