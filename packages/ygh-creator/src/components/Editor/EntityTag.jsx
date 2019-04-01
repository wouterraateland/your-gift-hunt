import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "./EntityTypeIcon"

const EntityTag = styled.span`
  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-size: smaller;
  line-height: 1;

  box-shadow: inset 0 0 0 0.1em #999;

  background-color: #eee;
  color: ${props => props.theme.color.text};
`

export default ({ entity, name, className, showIcon = true }) => (
  <EntityTag className={className}>
    {showIcon && <EntityTypeIcon {...entity} />} {name || entity.name}
  </EntityTag>
)
