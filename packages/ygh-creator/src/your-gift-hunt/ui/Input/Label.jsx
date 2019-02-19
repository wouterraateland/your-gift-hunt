import styled, { css } from "styled-components"
import { mix, opacify, invert, transparentize } from "polished"

import { LabelText } from "./LabelText"

const Label = styled.label`
  position: relative;

  display: ${props => (props.block ? "block" : "inline-block")};
  max-width: 100%;
  padding: 0.5em ${props => (props.isSelect ? 0 : 0.7)}em;
  ${props =>
    !props.isSelect &&
    css`
      border: 0.1em solid ${transparentize(0.5, props.theme.color.text)};
    `};

  line-height: 1;
  vertical-align: middle;

  background-color: ${props =>
    props.disabled
      ? mix(
          0.2,
          props.theme.color.text,
          opacify(1, invert(props.theme.color.text))
        )
      : opacify(1, invert(props.theme.color.text))};

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `}

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
`

Label.displayName = "Label"

export default Label
