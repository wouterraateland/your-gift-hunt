import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { Link } from "gatsby"
import styled from "styled-components"

import { Wrapper, Row, Column } from "your-gift-hunt/ui"
import { Logo, Twitter, Facebook } from "your-gift-hunt/icons"

const Footer = styled.footer`
  font-size: smaller;
  margin-top: 4em;
  padding-bottom: 2em;
`

const FooterLogo = styled(Logo)`
  margin-bottom: 1.58em;
  color: #000d;
`

const SocialLink = styled(OutboundLink)`
  margin: 0 1em;
`

export default () => (
  <Footer>
    <Wrapper xlarge>
      <Row vAlign="top">
        <Column size={3} sSize={6}>
          <FooterLogo size={4} />
          <p>
            &copy; {new Date().getUTCFullYear()} Your Gift Hunt.
            <br />
            All rights reserved.
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Company</h3>
          <p>
            <Link to="/home">Home</Link>
            <br />
            <a href="https://play.yourgifthunt.com">Showcase</a>
            <br />
            <Link to="/docs">Docs</Link>
            <br />
            <Link to="/contact">Contact</Link>
            <br />
            <Link to="/about">About</Link>
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
        <Column size={3} sSize={6}>
          <h3>Follow us</h3>
          <p>
            <SocialLink
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/YourGiftHunt"
            >
              <Twitter size={2} />
            </SocialLink>
            <SocialLink
              rel="noopener noreferrer"
              target="_blank"
              href="https://facebook.com/YourGiftHunt"
            >
              <Facebook size={2} />
            </SocialLink>
          </p>
        </Column>
      </Row>
    </Wrapper>
  </Footer>
)