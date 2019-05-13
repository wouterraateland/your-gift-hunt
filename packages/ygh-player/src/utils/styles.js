import { css } from "styled-components"

const blockCss = css`
  display: block;
  width: 100%;
`

export const blockStyles = props => {
  switch (props.block) {
    case true:
      return blockCss
    case "small":
      return css`
        @media (max-width: 30em) {
          ${blockCss}
        }
      `
    case "medium":
      return css`
        @media (max-width: 45em) {
          ${blockCss}
        }
      `
    default:
      return null
  }
}

export const unselectableStyles = css`
  -webkit-touch-callout: none;
  user-select: none;
  user-drag: none;
`
