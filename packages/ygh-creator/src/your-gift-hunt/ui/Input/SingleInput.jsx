import React from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"

import { LabelText } from "./LabelText"

const Input = styled.input`
  width: 15em;
  max-width: 100%;
  height: 1.5em;
  padding: 0;
  margin: 0;
  border: none;

  background: transparent;
  color: ${props =>
    props.disabled
      ? transparentize(0.2, props.theme.color.text)
      : props.theme.color.text};

  &:focus,
  &:active {
    outline: none;

    ${props =>
      !props.isSelect &&
      css`
        & + ${LabelText} {
          left: 0;
          top: -1.7em;
          font-size: 0.7em;
        }
      `}
  }

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `}
`

Input.displayName = "Input"
Input.defaultProps = {
  value: ""
}

export default ({ value, ...otherProps }) => (
  <Input value={value === null ? "" : value} {...otherProps} />
)
