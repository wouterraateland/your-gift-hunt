import React from "react"
import styled, { css } from "styled-components"

const EntityEntryContainer = styled.div`
  cursor: pointer;

  position: relative;
  height: 3em;
  padding: 1em 0.5em;

  ${props =>
    props.isDisabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover {
            background-color: #0002;
          }
        `}

  &:first-child {
    border-radius: ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${props => props.theme.borderRadius}
      ${props => props.theme.borderRadius};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #0004;
  }
`

const EntityEntry = ({ entity, ...otherProps }) => (
  <EntityEntryContainer {...otherProps}>{entity.name}</EntityEntryContainer>
)

export default EntityEntry
