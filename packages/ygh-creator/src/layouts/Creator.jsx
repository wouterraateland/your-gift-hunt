import React from "react"
import styled from "styled-components"

import PageContainer from "components/PageContainer"
import Nav from "components/Nav"
import SettingsButton from "components/SettingsButton"

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;

  flex-grow: 1;
`

const CreatorLayout = ({ hunt, children }) => (
  <PageContainer>
    <Nav
      title={
        <>
          {hunt ? hunt.name : ""}
          <SettingsButton hunt={hunt} />
        </>
      }
    />
    <Main>{children}</Main>
  </PageContainer>
)

export default CreatorLayout
