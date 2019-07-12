import React from "react"
import styled from "styled-components"

import { Wrapper } from "ygh-ui"
import Layout from "components/Layout"
import { Floor } from "ygh-entities"

const FullHeightWrapper = styled(Wrapper)`
  position: relative;
  overflow: hidden;

  height: calc(100vh - 22.5em);
  border-radius: 260% 120% 190% 250% / 250% 210% 180% 190%;
  border: 5vw solid transparent;
  box-shadow: inset 0 0 25vw 5vw #000c;

  display: flex;

  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const NotFoundPage = () => (
  <Layout>
    <FullHeightWrapper>
      <Floor />
      <h1>Nothing Here</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </FullHeightWrapper>
  </Layout>
)

export default NotFoundPage
