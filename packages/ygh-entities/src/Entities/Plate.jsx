import styled from "styled-components"

import Entity from "../Entity"

const Plate = styled(Entity)`
  border-radius: 100%;

  box-shadow: inset 0 0 0.125em #0009, inset 0 0 0 0.5em,
    inset 0 0 0.15em 0.5em #fff, inset 0 0 0.4em 0.5em #0009;
  background-color: #fff;
`
Plate.name = "Plate"
Plate.templateName = "Plate"
Plate.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 4,
  color: "#09f9"
}

export default Plate
