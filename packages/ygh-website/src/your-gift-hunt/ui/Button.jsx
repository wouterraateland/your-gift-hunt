import styled, { css } from "styled-components"
import { opacify } from "polished"
import _ from "utils"

const Button = styled.button`
  cursor: pointer;

  position: relative;

  display: inline-block;
  padding: ${props => {
    switch (props.size) {
      case "small":
        return "0.5em 0.65em"
      case "large":
        return "1em 1.15em"
      default:
        return "0.85em 1em"
    }
  }};
  border-radius: ${props => props.theme.borderRadius};

  line-height: 1;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;

  transition: background-color 0.2s ease-out;

  ${props => {
    let color
    let secondaryColor = props.theme.color.emphasis

    switch (props.color) {
      case "accent":
        color = _.darken(0.05)(props.theme.color.accent)
        break
      case "error":
        color = props.theme.color.error
        secondaryColor = "#fff"
        break
      case "primary":
        color = props.theme.color.primary
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
            background-color: ${opacify(0.3, _.darken(0.05)(color))};
          }
        `
      case "tertiary":
        return css`
          border: none;

          background-color: #fff;
          color: ${color};

          &:hover {
            background-color: ${_.darken(0.05)("#fff")};
          }
        `
      default:
        return css`
          border: 0.1em solid;

          ${"" /* background-color: #fff; */}
          color: ${color};

          &:hover {
            background-color: ${_.darken(0.05)("#fff")};
          }
        `
    }
  }}

  ${_.blockStyles}

  &:disabled {
    pointer-events: none;
    filter: grayscale(50%);
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 0.1em ${props => props.theme.color.primary};
  }
`

export default Button
