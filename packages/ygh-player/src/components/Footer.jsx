import React from "react"
import { Link } from "@reach/router"
import styled from "styled-components"

import { Wrapper, Row, Column } from "ygh-ui"
import { Logo, Twitter, Facebook } from "ygh-icons"

const Footer = styled.footer`
  font-size: smaller;
  margin-top: 4em;
  padding-bottom: 2em;
`

const FooterLogo = styled(Logo)`
  margin-bottom: 1.58em;
  color: #000d;
`

const SocialLink = styled.a`
  margin: 0 1em 0 0;
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
            <a href="https://yourgifthunt.com">Home</a>
            <br />
            <Link to="/">Showcase</Link>
            <br />
            <a href="https://create.yourgifthunt.com">Creator</a>
            <br />
            <a href="https://yourgifthunt.com/pricing">Pricing</a>
            <br />
            <a href="https://yourgifthunt.com/about">About</a>
            <br />
            <a href="https://yourgifthunt.com/contact">Contact</a>
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Legal</h3>
          <p>
            <a href="https://yourgifthunt.com/terms">Terms</a>
            <br />
            <a href="https://yourgifthunt.com/privacy">Privacy</a>
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
