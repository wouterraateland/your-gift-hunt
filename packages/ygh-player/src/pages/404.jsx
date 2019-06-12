import React from "react"
import styled from "styled-components"

import { Link } from "@reach/router"
import { Logo } from "your-gift-hunt/icons"
import Layout from "components/Layout"

const Center = styled.div`
  height: 100%;
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
  <Layout>
    <Center>
      <StyledLogo size={4} />
      <h1>No games to play here...</h1>
      <p>
        Visit <Link to={"/"}>the showcase</Link> to play many public games
      </p>
    </Center>
  </Layout>
)

export default NotFoundPage
