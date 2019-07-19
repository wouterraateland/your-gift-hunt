import styled, { css } from "styled-components"
import { transparentize } from "polished"

const InputContainer = styled.div`
  position: relative;

  border: ${props => props.theme.borderWidth} solid #0002;
  border-radius: ${props => props.theme.borderRadius};

  background: #fff no-repeat center padding-box / cover;

  transition-property: border-color, color, background-color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  ${props =>
    props.disabled
      ? css`
          color: #d4d4d4;
          background-color: #f2f2f2;
        `
      : css`
          &:hover {
            border-color: #0004;
          }

          &:focus-within {
            border-color: ${props => props.theme.color.primary};
            box-shadow: 0 0 0 4px
              ${props => transparentize(0.5)(props.theme.color.primary)};
          }
        `}
`

export default InputContainer
