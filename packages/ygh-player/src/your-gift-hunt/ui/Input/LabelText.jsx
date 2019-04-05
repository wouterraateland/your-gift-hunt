import React from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"
import InputType from "../InputType"

export const LabelText = styled.span`
  pointer-events: none;

  position: absolute;

  color: ${props => transparentize(0.2, props.theme.color.text)};

  transition: left 0.2s ease-out, top 0.2s ease-out, font-size 0.2s ease-out;

  ${props =>
    props.isSelect
      ? css`
          left: 2em;
          top: 0.3em;
          font-weight: bold;
          color: ${props.theme.color.emphasis};
          & small {
            display: block;
            font-weight: normal;
            color: ${props.theme.color.text};
          }
        `
      : css`
          & small {
            margin-left: 0.5em;
            vertical-align: baseline;
            &::before {
              content: "(";
              vertical-align: baseline;
            }
            &::after {
              content: ")";
              vertical-align: baseline;
            }
          }
          ${props.up
            ? css`
                left: 0;
                top: -1.7em;
                font-size: 0.7em;
              `
            : css`
                left: 0.7rem;
                top: 0.7em;
              `}
        `}
`

LabelText.displayName = "LabelText"

export default ({
  label,
  info,
  showType,
  type,
  isMulti,
  isSecret,
  ...otherProps
}) => (
  <LabelText {...otherProps}>
    {label}
    {info && <small>{info}</small>}
    {showType && (
      <InputType type={type} isMulti={isMulti} isSecret={isSecret} />
    )}
  </LabelText>
)
