import styled from "styled-components"

import Entity from "../Entity"

const SportPants = styled(Entity)`
  background: url(https://storage.googleapis.com/your-gift-hunt/sara/sport-pants.png)
    no-repeat center / contain;
`
SportPants.name = "SportPants"
SportPants.templateName = "Sport Pants"
SportPants.defaultProps = {
  ...Entity.defaultProps,
  width: 3,
  height: 3
}

export default SportPants
