import React from "react"
import styled, { css } from "styled-components"

const StateTag = styled.span`
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}

  display: inline-block;
  margin: 0;
  padding: 0.125em 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-size: smaller;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1;
  vertical-align: baseline;

  background-color: #999;
  color: #fff;
`

export default ({ state, onClick }) => (
  <StateTag onClick={onClick}>
    {state && state.name ? state.name : "Default"}
  </StateTag>
)
