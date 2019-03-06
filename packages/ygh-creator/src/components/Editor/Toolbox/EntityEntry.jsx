import React from "react"
import styled from "styled-components"

const EntityEntryContainer = styled.div`
  cursor: pointer;

  position: relative;
  height: 3em;
  padding: 0.5em;

  &:hover {
    background-color: #0002;
  }

  &:first-child {
    border-radius: ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius};
  }
`

const EntityEntry = ({ entity, ...otherProps }) => (
  <EntityEntryContainer {...otherProps}>{entity.name}</EntityEntryContainer>
)

export default EntityEntry
