import styled, { css } from "styled-components"
import { opacify, invert, transparentize } from "polished"

import { LabelText } from "./LabelText"

const Label = styled.label`
  position: relative;

  display: ${props => (props.block ? "block" : "inline-block")};
  max-width: 100%;
  padding: 0.5em 0.7em;
  border: 0.1em solid ${props => transparentize(0.5, props.theme.color.text)};

  line-height: 1;
  vertical-align: middle;

  background-color: ${props => opacify(1, invert(props.theme.color.text))};

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `}

  &:focus-within {
    ${LabelText} {
      left: 0;
      top: -1.7em;
      font-size: 0.7em;
    }
  }
`

Label.displayName = "Label"

export default Label
