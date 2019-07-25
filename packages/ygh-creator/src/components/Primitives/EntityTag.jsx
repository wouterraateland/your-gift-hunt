import React from "react"
import styled from "styled-components"

import EntityTypeIcon from "components/EntityTypeIcon"

export const Outer = styled.span`
  cursor: pointer;

  display: inline-block;
  padding: 0.125rem 0.25rem;
  margin: 0.25rem 0;
  border-radius: ${props => props.theme.borderRadius};

  font-size: 0.75rem;
  line-height: 1;

  box-shadow: inset 0 0 0 1px #999;

  background-color: #f2f2f2;
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
