import React from "react"
import styled from "styled-components"

import { Link } from "@reach/router"
import { FullHeight } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"

const Center = styled(FullHeight)`
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLogo = styled(Logo)`
  color: #000;
  .background {
    fill: #fff;
  }
`

const NotFoundPage = () => (
  <Center>
    <StyledLogo size={4} />
    <h1>No games to play here...</h1>
    <p>
      Visit <Link to={"/"}>the showcase</Link> to play many public games
    </p>
  </Center>
)

export default NotFoundPage
