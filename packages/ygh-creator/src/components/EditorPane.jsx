import React from "react"
import styled from "styled-components"

const StyledEditorPane = styled.div`
  flex-grow: 1;

  background-color: #f5f6fb;
  background-image: repeating-linear-gradient(
      transparent 0,
      transparent 0.95em,
      #0001 0.95em,
      #0001 1.05em,
      transparent 1.05em,
      transparent 2em
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 0.95em,
      #0001 0.95em,
      #0001 1.05em,
      transparent 1.05em,
      transparent 2em
    );
`

const EditorPane = ({ children }) => {
  return <StyledEditorPane>{children}</StyledEditorPane>
}

export default EditorPane
