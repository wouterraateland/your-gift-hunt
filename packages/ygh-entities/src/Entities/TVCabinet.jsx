import styled from "styled-components"

import Entity from "../Entity"
import plankStyles from "../plankStyles"

const TVCabinet = styled(Entity)`
  ${plankStyles}

  &,
  &::before {
    border-radius: 0.25em;
  }
`
TVCabinet.name = "TVCabinet"
TVCabinet.templateName = "TV Cabinet"
TVCabinet.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 12,
  color: "#F2DFDA"
}

export default TVCabinet
