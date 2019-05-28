import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "components/EntityTypeIcon"

const Outer = styled.span`
  cursor: pointer;

  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-size: smaller;
  line-height: 1;

  box-shadow: inset 0 0 0 0.1em #999;

  background-color: #eee;
  color: ${props => props.theme.color.text};
`

const EntityTag = ({
  entity,
  children,
  showEntity = true,
  showIcon = true,
  onClick
}) => (
  <Outer onClick={onClick}>
    {showIcon && <EntityTypeIcon {...entity} />} {showEntity && entity.name}
    {children}
  </Outer>
)

export default EntityTag
