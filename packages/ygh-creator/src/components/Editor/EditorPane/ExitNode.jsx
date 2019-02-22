import styled from "styled-components"

const ExitNode = styled.div.attrs(({ position: { left, top } }) => ({
  style: {
    left: `${left + 96}px`,
    top: `${top}px`
  }
}))`
  position: absolute;

  width: 2em;
  height: 2em;
  border: .1em solid #0009
  border-radius: 100%;

  background-image: radial-gradient(#0009, #0000 50%);

  transform: translate(-50%, -50%);
`

export default ExitNode
