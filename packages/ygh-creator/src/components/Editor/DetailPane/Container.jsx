import styled from "styled-components"

import { Paper } from "your-gift-hunt/ui"

const DetailPaneContainer = styled(Paper)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  width: 25em;
  max-width: 100%;

  transform: translate3D(${props => (props.isOpen ? 0 : 100)}%, 0, 0);

  transition: transform ease-in-out 0.3s;
`

export default DetailPaneContainer
