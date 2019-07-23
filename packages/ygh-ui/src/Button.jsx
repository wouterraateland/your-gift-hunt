import React, { forwardRef } from "react"
import styled, { css } from "styled-components"
import { darken, opacify, transparentize, readableColor } from "polished"
import _ from "ygh-utils"

const ButtonContainer = styled.button.attrs(({ disabled }) => ({
  tabIndex: disabled ? -1 : 0
}))`
  cursor: pointer;

  position: relative;

  display: inline-block;
  padding: ${props => {
    switch (props.size) {
      case "tiny":
        return "0.25em 0.5em"
      case "small":
        return "0.5em 0.75em"
      case "large":
        return "1em 1.25em"
      default:
        return "0.75em 1em"
    }
  }};
  border: none;
  border-radius: ${props => props.theme.borderRadius};

  line-height: 1;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  font-weight: bold;

  transition-property: color, background-color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: initial;
    pointer-events: none;
  }

  ${props => {
    const color = props.disabled
      ? "#d4d4d4"
      : opacify(1)(props.theme.color[props.color] || props.theme.color.emphasis)
    const secondaryColor = props.disabled
      ? "#f2f2f2"
      : readableColor(
          darken(0.2)(color),
          opacify(1)(props.theme.color.emphasis),
          "#fff"
        )
    const hoverColor = props.disabled ? "#d4d4d4" : darken(0.1)(color)

    switch (props.importance) {
      case "primary":
        return css`
          background-color: ${color};
          color: ${secondaryColor};

          &:hover {
            background-color: ${hoverColor};
          }

          &:focus {
            box-shadow: 0 0 0 4px ${transparentize(0.5, color)};
          }
        `
      case "tertiary":
        return css`
          background-color: #fff;
          color: ${color};

          &:hover {
            color: ${hoverColor};
          }

          &:focus {
            box-shadow: 0 0 0 4px ${transparentize(0.5, color)};
          }
        `
      default:
        return css`
          box-shadow: inset 0 0 0 2px;

          background-color: #fff;
          color: ${color};

          &:hover {
            color: ${hoverColor};
          }

          &:focus {
            box-shadow: inset 0 0 0 2px, 0 0 0 4px ${transparentize(0.5, color)};
          }
        `
    }
  }}

  ${_.blockStyles}
`

const Lead = styled.span`
  margin-right: 0.5em;
`
const Trail = styled.span`
  margin-left: 0.5em;
`

const Button = forwardRef(({ lead, trail, children, ...otherProps }, ref) => (
  <ButtonContainer {...otherProps} ref={ref}>
    {lead && <Lead>{lead}</Lead>}
    {children}
    {trail && <Trail>{trail}</Trail>}
  </ButtonContainer>
))

export default Button
