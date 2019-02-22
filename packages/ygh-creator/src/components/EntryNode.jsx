import styled from "styled-components"

const EntryNode = styled.div.attrs(({ position: { left, top } }) => ({
  style: {
    left: `${left + 96}px`,
    top: `${top + 96}px`
  }
}))`
  position: absolute;

  width: 1em;
  height: 1em;
  border-radius: 100%;

  background-color: #0009;

  transform: translate(-50%, -50%);
`

export default EntryNode
