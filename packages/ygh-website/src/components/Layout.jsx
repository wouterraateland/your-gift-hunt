import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"

import { YGHPlayerProvider } from "ygh-sdk"
import { ModalProvider } from "contexts/Modal"

import { Theme } from "ygh-ui"
import SEO from "components/SEO"
import Nav from "components/Nav"
import Body from "components/Body"
import Footer from "components/Footer"

const FlexColumn = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  background: linear-gradient(
      150deg,
      ${props => props.theme.color.secondary} 30vw,
      #ebedf5 30vw,
      #ebedf5 40vw,
      transparent 40vw
    )
    no-repeat top left;
`

const Layout = ({ children, ...rest }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
            siteDescription
            siteFBAppID
            siteImage
            siteTitle
            siteTitleAlt
            siteUrl
            pathPrefix
            userTwitter
          }
        }
      }
    `}
    render={data => (
      <Theme>
        <YGHPlayerProvider apiKey={process.env.REACT_APP_YGH_PLAYER_KEY}>
          <ModalProvider>
            <SEO config={data.site.siteMetadata} />
            <FlexColumn index={rest.index}>
              <Nav {...rest} />
              <Body index={rest.index}>{children}</Body>
              <Footer />
            </FlexColumn>
          </ModalProvider>
        </YGHPlayerProvider>
      </Theme>
    )}
  />
)

export default Layout
