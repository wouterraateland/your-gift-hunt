import React from "react"
import styled, { css } from "styled-components"

import { ToolTip } from "your-gift-hunt/ui"

const TypeEntryContainer = styled.div`
  cursor: pointer;

  position: relative;
  height: 3em;
  padding: 0.5em;

  text-align: center;

  ${props =>
    props.isSelected &&
    css`
      background-color: #0002;
    `}

  &:hover {
    background-color: #0004;
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

const TypeEntry = ({ icon: Icon, label, isSelected, ...otherProps }) => (
  <TypeEntryContainer isSelected={isSelected} {...otherProps}>
    <Icon size={2} />
    {!isSelected && <ToolTip right>{label}</ToolTip>}
  </TypeEntryContainer>
)

export default TypeEntry
