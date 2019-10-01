import styled from "styled-components"

import Entity from "../Entity"
import plankStyles from "../plankStyles"

const SideTable = styled(Entity)`
  ${plankStyles}

  &,
  &::before {
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
  }
`
SideTable.name = "SideTable"
SideTable.templateName = "Side Table"
SideTable.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 8,
  color: "#564530"
}

export default SideTable
