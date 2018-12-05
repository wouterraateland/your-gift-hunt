import React from 'react'
import { StaticQuery, graphql } from "gatsby"

import Theme from 'containers/Theme'
import SEO from 'components/SEO'
import Nav from 'components/Nav'
import Body from 'components/Body'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
              siteDescription,
              siteFBAppID,
              siteLogo,
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
          <Nav />
          <Body>{children}</Body>
        </Theme>
      </>
    )}
  />
)

export default TemplateWrapper
