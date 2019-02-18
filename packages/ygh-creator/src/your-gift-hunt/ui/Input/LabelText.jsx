import { memo } from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"

export const LabelText = styled.span`
  position: absolute;

  color: ${props => transparentize(0.2, props.theme.color.text)};

  transition: left 0.2s ease-out, top 0.2s ease-out, font-size 0.2s ease-out;

  ${props =>
    props.isSelect
      ? css`
          left: 2em;
          top: 0.7em;
          & small {
            display: block;
          }
        `
      : css`
          & small {
            &::before {
              content: "(";
            }
            &::after {
              content: ")";
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

export default memo(LabelText)
