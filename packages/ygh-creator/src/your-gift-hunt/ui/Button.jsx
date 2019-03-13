import styled, { css } from "styled-components"
import { opacify } from "polished"
import { darken } from "utils/colors"

const Button = styled.button`
  cursor: pointer;

  position: relative;

  display: inline-block;
  padding: ${props => {
    switch (props.size) {
      case "small":
        return "0.5em 0.4em"
      default:
        return "0.85em 0.7em"
    }
  }};
  border-radius: ${props => props.theme.borderRadius};

  line-height: 1;
  vertical-align: middle;
  font-weight: bold;

  transition: background-color 0.2s ease-out;

  ${props => {
    let color
    let secondaryColor = props.theme.color.emphasis

    switch (props.color) {
      case "accent":
        color = darken(0.05)(props.theme.color.accent)
        break
      case "error":
        color = props.theme.color.error
        secondaryColor = "#fff"
        break
      case "warning":
        color = props.theme.color.warning
        break
      case "success":
        color = props.theme.color.success
        break
      default:
        color = props.theme.color.emphasis
        break
    }

    switch (props.importance) {
      case "primary":
        return css`
          border: none;

          background-color: ${color};
          color: ${secondaryColor};

          &:hover {
            background-color: ${opacify(0.3, darken(0.05)(color))};
          }
        `
      case "tertiary":
        return css`
          border: none;

          background-color: #fff;
          color: ${color};

          &:hover {
            background-color: ${darken(0.05)("#fff")};
          }
        `
      default:
        return css`
          border: 0.1em solid;

          background-color: #fff;
          color: ${color};

          &:hover {
            background-color: ${darken(0.05)("#fff")};
          }
        `
    }
  }}

  ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  &:disabled {
    pointer-events: none;
    filter: grayscale(50%);
  }

  &:focus {
    outline: none;
    border: 0.1em solid #39f;
  }
`

export default Button
