import React from "react"
import styled from "styled-components"

import PageContainer from "components/PageContainer"
import Nav from "components/Nav"
import Footer from "components/Footer"

const Main = styled.main`
  flex-grow: 1;
`

const OverviewLayout = ({ title, items, children }) => (
  <PageContainer>
    <Nav title={title} items={items} />
    <Main>{children}</Main>
    <Footer />
  </PageContainer>
)

export default OverviewLayout
