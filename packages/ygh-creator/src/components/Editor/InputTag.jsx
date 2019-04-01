import React from "react"
import styled from "styled-components"

import { ToolTip } from "your-gift-hunt/ui"

const InputTagContainer = styled.span`
  position: relative;

  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-size: smaller;
  line-height: 1;

  box-shadow: inset 0 0 0 0.1em #999;

  background-color: #eee;
  color: ${props => props.theme.color.text};
`

const InputIcon = styled.span`
  display: inline-block;
  padding: 0.25em 0.5em;
  margin: -0.25em 0.5em -0.25em -0.5em;
  border-radius: 0.25em 0 0 0.25em;

  font-family: monospace;
  font-weight: bold;
  font-size: 13px;

  background: #0002;
`

export default ({ children, ...otherProps }) => (
  <InputTagContainer {...otherProps}>
    <InputIcon>>_</InputIcon>
    {children}
    <ToolTip>Input value</ToolTip>
  </InputTagContainer>
)
