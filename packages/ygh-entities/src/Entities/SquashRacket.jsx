import styled from "styled-components"

import Entity from "../Entity"

const SquashRacket = styled(Entity)`
  background: url(https://storage.googleapis.com/your-gift-hunt/sara/squash-racket.png)
    no-repeat center / contain;
`
SquashRacket.name = "SquashRacket"
SquashRacket.templateName = "Squash Racket"
SquashRacket.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 4
}

export default SquashRacket
