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
  border-radius: 100%;

  background-image: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    #0009 50%,
    #0000 55%,
    #0000 80%,
    #0009 85%
  );

  transform: translate(-50%, -50%);
`

export default ExitNode
