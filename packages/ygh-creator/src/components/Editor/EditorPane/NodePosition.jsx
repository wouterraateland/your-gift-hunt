import styled from "styled-components"

const NodePosition = styled.div.attrs(({ position }) => ({ style: position }))`
  position: absolute;
`

export default NodePosition
