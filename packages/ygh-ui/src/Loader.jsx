import React from "react"
import styled, { keyframes } from "styled-components"

import * as Icons from "ygh-icons"

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  align-items: center;
  justify-content: center;
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Spinner = styled(Icons.Logo)`
  animation: ${spin} 1s linear infinite;
`

const Text = styled.p``

const TinyLoader = () => (
  <Container>
    <Spinner as={Icons.Cube} />
  </Container>
)

const SmallLoader = () => (
  <Container row>
    <Spinner as={Icons.Cube} /> <Text>Loading...</Text>
  </Container>
)

const Loader = () => (
  <Container>
    <Spinner size={3} /> <Text>Loading...</Text>
  </Container>
)

Loader.Small = SmallLoader
Loader.Tiny = TinyLoader

export default Loader
