import React from 'react'
import styled from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Link } from 'gatsby'

import { Wrapper, Align } from 'components/ui'
import { Logo, Twitter, Facebook } from 'components/icons'

const Footer = styled.footer`
  margin-top: 1.58em;
`

const SocialLink = styled(OutboundLink)`
  margin: 0 1em;
`

export default () => (
  <Footer>
    <Wrapper medium>
      <hr />
      <Align.Center>
        <Logo size={4} />
        <p>
          <Link to="/about">About</Link><br />
          <Link to="/blog">Blog</Link><br />
          <Link to="/pricing">Pricing</Link><br />
          <Link to="/faq">FAQ</Link>
        </p>
        <p>
          <SocialLink rel="noopener noreferrer" target="_blank" href="https://twitter.com/YourGiftHunt">
            <Twitter size={2} />
          </SocialLink>
          <SocialLink rel="noopener noreferrer" target="_blank" href="https://facebook.com/YourGiftHunt">
            <Facebook size={2} />
          </SocialLink>
        </p>
        <p>
          <Link to="/contact">Contact</Link>
          <span> | </span>
          <Link to="/terms">Terms</Link>
          <span> | </span>
          <Link to="/privacy">Privacy</Link>
        </p>
        <p>
          <small>Your Gift Hunt &copy; {new Date().getUTCFullYear()}</small>
        </p>
      </Align.Center>
    </Wrapper>
  </Footer>
)
