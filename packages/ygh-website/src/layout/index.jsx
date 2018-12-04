import React from "react"
import Helmet from "react-helmet"
import config from "data/SiteConfig"

import Theme from 'containers/Theme'
import Nav from 'components/Nav'
import Body from 'components/Body'

const MainLayout = ({ children }) => (
  <>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <Theme>
      <Nav />
      <Body>
        {children}
      </Body>
    </Theme>
  </>
)

export default MainLayout
