import styled from "styled-components"

import Entity from "../Entity"

const SportShirt = styled(Entity)`
  background: url(https://storage.googleapis.com/your-gift-hunt/sara/sport-shirt.png)
    no-repeat center / contain;
`
SportShirt.name = "SportShirt"
SportShirt.templateName = "Sport Shirt"
SportShirt.defaultProps = {
  ...Entity.defaultProps,
  width: 3,
  height: 4
}

export default SportShirt
