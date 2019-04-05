import React from "react"
import styled, { keyframes } from "styled-components"

import Logo from "your-gift-hunt/icons/Logo"

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Spinner = styled(Logo)`
  animation: ${spin} 1s linear infinite;
`

const Text = styled.p``

const Loader = () => (
  <Container>
    <Spinner size={3} />
    <Text>Loading...</Text>
  </Container>
)

export default Loader
