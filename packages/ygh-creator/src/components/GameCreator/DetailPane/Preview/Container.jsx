import styled from "styled-components"

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  height: 8em;
  margin-bottom: 1em;

  &:empty {
    display: none;
  }
`

export default PreviewContainer
