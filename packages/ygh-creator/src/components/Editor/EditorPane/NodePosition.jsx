import styled from "styled-components"

const NodePosition = styled.div.attrs(({ position }) => ({ style: position }))`
  position: absolute;
  transition-property: top left;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  will-change: left, top;
`

export default NodePosition
