import React from "react"
import styled from "styled-components"

import Base from "./Base"
import { Align, Wrapper } from "your-gift-hunt/ui"

const IntroScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fffc;

  h1 {
    color: #fff;
  }
`

export default props => (
  <IntroScreen {...props}>
    <Align.Center>
      <Wrapper small>
        <h1>You finished the game</h1>
        <p>
          You did it! You have taken good care of Carl's plant, he can enjoy his
          holiday now, thanks!
        </p>
      </Wrapper>
    </Align.Center>
  </IntroScreen>
)
