import React from "react"
import styled from "styled-components"

import { Wrapper, Align } from "ygh-ui"
import { Logo } from "ygh-icons"

const Center = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LogoWithMargin = styled(Logo)`
  margin: 1.58em;

  color: #000;
  .background {
    fill: #fff;
  }
`

const AuthLayout = ({ children }) => {
  return (
    <Center>
      <Align.Center>
        <LogoWithMargin size={6} />
      </Align.Center>
      <div>
        <Wrapper small>{children}</Wrapper>
      </div>
    </Center>
  )
}

export default AuthLayout
