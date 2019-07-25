import styled, { css } from "styled-components"
import { transparentize } from "polished"

const InputContainer = styled.div`
  position: relative;

  display: flex;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: inset 0 0 0 ${props => props.theme.borderWidth} #0002;

  background: #fff no-repeat center padding-box / cover;

  transition-property: border-color, color, background-color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  ${props =>
    props.disabled
      ? css`
          color: #d4d4d4;
          background-color: #f9f9f9;
        `
      : css`
          ${props.error &&
            css`
              box-shadow: inset 0 0 0 ${props => props.theme.borderWidth}
                ${props => props.theme.color.error};
            `}
          &:hover {
            box-shadow: inset 0 0 0 ${props => props.theme.borderWidth} #0004;
          }

          &:focus-within {
            box-shadow: inset 0 0 0 ${props => props.theme.borderWidth}
                ${props => props.theme.color.primary},
              0 0 0 4px
                ${props => transparentize(0.5)(props.theme.color.primary)};
          }
        `}
`

export default InputContainer
