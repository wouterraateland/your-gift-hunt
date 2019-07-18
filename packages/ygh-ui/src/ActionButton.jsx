import styled from "styled-components"

const ActionButton = styled.button`
  cursor: pointer;

  display: inline-block;
  width: 1em;
  height: 1em;
  padding: 0;
  border: none;

  line-height: 1;
  font-size: smaller;
  vertical-align: middle;

  background: transparent;
  color: ${props => props.theme.color.text};

  transition: color 0.2s ease-out;

  &:hover {
    color: ${props =>
      props.theme.color[props.color] || props.theme.color.emphasis};
  }
`
ActionButton.displayName = "ActionButton"

export default ActionButton
