import styled from "styled-components"
import _ from "ygh-utils"

const Textarea = styled.textarea`
  height: 8em;
  padding: 0;
  border: none;
  resize: vertical;

  background: transparent;

  &:focus,
  &:active {
    outline: none;
  }

  ${_.blockStyles}
`

Textarea.displayName = "Textarea"

export default Textarea
