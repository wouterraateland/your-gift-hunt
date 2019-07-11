import styled, { css } from "styled-components"
import { mix, opacify, invert, transparentize } from "polished"

import { LabelText } from "./LabelText"
import _ from "ygh-utils"

const Label = styled.label`
  position: relative;

  display: inline-block;
  max-width: 100%;
  ${props =>
    !props.isMap &&
    css`
      padding: ${props.isSelect ? "0.5em 0" : "0.5em 0.7em"};
    `}

  ${props =>
    !props.isSelect &&
    css`
          border: 0.1em solid ${transparentize(0.5, props.theme.color.text)};
          border-radius: ${props => props.theme.borderRadius};

          ${!props.disabled &&
            css`
              &:hover {
                border-color: #0004;
              }

              &:focus-within {
                border-color: ${props => props.theme.color.primary};
              }
            `}

            background-color: ${
              props.disabled
                ? mix(
                    0.2,
                    props.theme.color.text,
                    opacify(1, invert(props.theme.color.text))
                  )
                : opacify(1, invert(props.theme.color.text))
            };
        `};

  line-height: 1;
  vertical-align: middle;

  ${_.blockStyles}

  ${props =>
    !props.isSelect &&
    css`
      &:focus-within {
        ${LabelText} {
          left: 0;
          top: -1.7em;
          font-size: 0.7em;
        }
      }
    `}

  & textarea {
    line-height: 1.5em;
  }
`

Label.displayName = "Label"

export default Label
