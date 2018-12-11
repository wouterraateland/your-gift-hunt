import React from 'react'
import { StaticQuery, graphql } from "gatsby"

import Theme from 'containers/Theme'
import SEO from 'components/SEO'
import Nav from 'components/Nav'
import Body from 'components/Body'
import Footer from 'components/Footer'

const Layout = ({ children, ...rest }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
              siteDescription,
              siteFBAppID,
              siteImage,
              siteTitle,
              siteTitleAlt,
              siteUrl,
              pathPrefix,
              userTwitter,
            }
          }
        }
    `}
    render={data => (
      <>
        <SEO config={data.site.siteMetadata} />
        <Theme>
          <Nav {...rest} />
          <Body>{children}</Body>
          <Footer />
        </Theme>
      </>
    )}
  />
)

export default Layout
