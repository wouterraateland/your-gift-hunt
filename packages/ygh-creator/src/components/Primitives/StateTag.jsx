import React from "react"
import styled, { css } from "styled-components"

import { Outer } from "./EntityTag"

const StateTag = styled.span`
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}

  display: inline-block;
  margin: 0.25rem 0;
  padding: 0.125rem 0.25rem;
  border-radius: ${props => props.theme.borderRadius};

  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1;

  background-color: #999;
  color: #fff;

  ${Outer} & {
    margin: -0.125rem 0.25rem;

    &:last-of-type {
      margin-right: -0.25rem;
    }
  }
`

export default ({ state, onClick }) => (
  <StateTag onClick={onClick}>
    {state && state.name ? state.name : "Default"}
  </StateTag>
)
