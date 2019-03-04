import styled from "styled-components"

const ActionButton = styled.button`
  cursor: pointer;

  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  padding: 0.2em 0.3em 0.3em;
  margin-left: 0.5em;
  border: none;
  border-radius: 100%;

  line-height: 1;
  font-size: smaller;
  text-align: center;
  vertical-align: middle;

  background-color: #0002;

  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: ${props =>
      (props.color && props.theme.color[props.color]) || "#0004"};
  }
`
ActionButton.displayName = "ActionButton"

export default ActionButton
