import styled from "styled-components"

const ToolboxContainer = styled.div`
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  position: absolute;
  left: 1em;
  top: 1em;

  display: flex;
  align-items: flex-start;
`

export default ToolboxContainer
