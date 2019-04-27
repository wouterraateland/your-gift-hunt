import React from "react"
import { StaticQuery, graphql } from "gatsby"

import { ModalProvider } from "contexts/Modal"

import { FullHeight } from "your-gift-hunt/ui"
import Theme from "containers/Theme"
import SEO from "components/SEO"
import Nav from "components/Nav"
import Body from "components/Body"
import Footer from "components/Footer"

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
        <ModalProvider>
          <SEO config={data.site.siteMetadata} />
          <FullHeight>
            <Nav {...rest} />
            <Body index={rest.index}>{children}</Body>
            <Footer />
          </FullHeight>
        </ModalProvider>
      </Theme>
    )}
  />
)

export default Layout
