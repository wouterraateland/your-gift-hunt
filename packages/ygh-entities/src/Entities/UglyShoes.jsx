import styled from "styled-components"

import Entity from "../Entity"

const UglyShoes = styled(Entity)`
  background: url(https://storage.googleapis.com/your-gift-hunt/sara/hiking-shoes.png)
    no-repeat center / contain;
`
UglyShoes.name = "UglyShoes"
UglyShoes.templateName = "Ugly Shoes"
UglyShoes.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 2
}

export default UglyShoes
