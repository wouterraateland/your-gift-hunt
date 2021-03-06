import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { Wrapper, Row, Column } from "ygh-ui"
import { Logo } from "ygh-icons"

const Footer = styled.footer`
  font-size: smaller;
  margin-top: 4em;
  padding-bottom: 2em;

  a {
    color: inherit;
  }
`

const FooterLogo = styled(Logo)`
  margin-bottom: 1.58em;
  color: ${props => props.theme.color.emphasis};
`

export default () => (
  <Footer>
    <Wrapper.Large>
      <Row vAlign="top">
        <Column size={3} sSize={6}>
          <FooterLogo size={4} />
          <p>
            &copy; {new Date().getUTCFullYear()} Escape Room Creator.
            <br />
            All rights reserved.
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Company</h3>
          <p>
            <Link to="/">Home</Link>
            <br />
            <a href="/showcase">Showcase</a>
            <br />
            <a href="/my-games">Creator</a>
            {/* <br />
            <Link to="/pricing">Pricing</Link> */}
            <br />
            <Link to="/about">About</Link>
            <br />
            <Link to="/contact">Contact</Link>
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Legal</h3>
          <p>
            <Link to="/terms">Terms</Link>
            <br />
            <Link to="/privacy">Privacy</Link>
          </p>
        </Column>
      </Row>
    </Wrapper.Large>
  </Footer>
)
