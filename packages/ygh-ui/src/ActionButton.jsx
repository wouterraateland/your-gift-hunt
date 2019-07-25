import styled from "styled-components"
import { transparentize } from "polished"

const ActionButton = styled.button`
  cursor: pointer;

  display: inline-block;
  width: 1em;
  height: 1em;
  padding: 0;
  border: none;
  border-radius: 100%;

  line-height: 1;

  background: transparent;
  color: ${props => props.theme.color.text};

  transition: color 0.2s ease-out;

  &:hover {
    color: ${props =>
      props.theme.color[props.color] || props.theme.color.emphasis};
  }

  margin: 0.25em;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px
      ${props =>
        transparentize(0.5)(
          props.theme.color[props.color] || props.theme.color.emphasis
        )};
    background-color: ${props =>
      transparentize(0.5)(
        props.theme.color[props.color] || props.theme.color.emphasis
      )};
  }
`
ActionButton.displayName = "ActionButton"

export default ActionButton
