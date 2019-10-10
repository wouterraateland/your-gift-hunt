import styled from "styled-components"

import Entity from "../Entity"

const BowlingShoes = styled(Entity)`
  background: url(https://storage.googleapis.com/your-gift-hunt/sara/bowling-shoes.png)
    no-repeat center / contain;
`
BowlingShoes.name = "BowlingShoes"
BowlingShoes.templateName = "Bowling Shoes"
BowlingShoes.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 1
}

export default BowlingShoes
