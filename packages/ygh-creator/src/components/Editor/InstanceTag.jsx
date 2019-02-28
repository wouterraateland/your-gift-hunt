import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "./EntityTypeIcon"

const InstanceTag = styled.span`
  display: inline-block;
  padding: 0.1em 0.5em;

  font-size: smaller;

  background-color: ${props => props.theme.color.accent};
`

export default ({ name, entity }) => (
  <InstanceTag>
    <EntityTypeIcon {...entity} /> {name}
  </InstanceTag>
)
