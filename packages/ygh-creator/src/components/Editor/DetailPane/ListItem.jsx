import { EDGE_TYPES } from "data"
import styled from "styled-components"

const ListItem = styled.li`
  display: block;
  padding: 0;
  margin-bottom: .5em;

  &::before {
    content: "${({ type }) => {
      switch (type) {
        case EDGE_TYPES.ENTRY:
          return "\u2022"
        default:
          return "\u2192"
      }
    }}";

    font-weight: bold;

    margin-right: 0.5em;

    color: ${({ type }) => {
      switch (type) {
        case EDGE_TYPES.USE:
          return "#3f9"
        case EDGE_TYPES.UNLOCK:
        case EDGE_TYPES.ENTRY:
          return "#39f"
        default:
          return "currentColor"
      }
    }};
  }
`

export default ListItem
