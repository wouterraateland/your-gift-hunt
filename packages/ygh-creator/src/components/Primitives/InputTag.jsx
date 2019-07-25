import React from "react"
import styled from "styled-components"

import { ToolTip } from "ygh-ui"

const InputTagContainer = styled.span`
  position: relative;

  display: inline-block;
  padding: 0.125rem 0.25rem;
  border-radius: ${props => props.theme.borderRadius};

  font-size: 0.75rem;
  line-height: 1;

  box-shadow: inset 0 0 0 1px #999;

  background-color: #f9f9f9;
  color: ${props => props.theme.color.text};
`

const InputIcon = styled.span`
  display: inline-block;
  padding: 0.125rem 0.25rem;
  margin: -0.125rem 0.25rem -0.125rem -0.25rem;
  border-radius: 0.25rem 0 0 0.25rem;

  font-weight: bold;

  background-color: #0002;
`

export default ({ children, ...otherProps }) => (
  <InputTagContainer {...otherProps}>
    <InputIcon>>_</InputIcon>
    {children}
    <ToolTip>User input</ToolTip>
  </InputTagContainer>
)
