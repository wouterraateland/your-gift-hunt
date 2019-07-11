import React from "react"
import styled from "styled-components"

import { FullHeight } from "ygh-ui"
import Nav from "components/Nav"
import Body from "components/Body"
import Footer from "components/Footer"

const StyledFullHeight = styled(FullHeight)`
  background: linear-gradient(
      150deg,
      ${props => props.theme.color.accent} 30vw,
      #ebedf5 30vw,
      #ebedf5 40vw,
      transparent 40vw
    )
    no-repeat top left;
`

const Layout = ({ children, index, ...rest }) => (
  <StyledFullHeight>
    <Nav {...rest} />
    <Body index={index}>{children}</Body>
    <Footer />
  </StyledFullHeight>
)

export default Layout
