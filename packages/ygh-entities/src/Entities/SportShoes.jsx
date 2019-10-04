import styled from "styled-components"

import Entity from "../Entity"

const SportShoes = styled(Entity)`
  background: url(https://storage.cloud.google.com/your-gift-hunt/sara/sport-shoes.png)
    no-repeat center / contain;
`
SportShoes.name = "SportShoes"
SportShoes.templateName = "Sport Shoes"
SportShoes.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 2
}

export default SportShoes
