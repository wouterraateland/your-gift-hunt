import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { Wrapper, Row, Column } from 'components/ui'
import { Logo, Twitter, Facebook } from 'components/icons'

const Footer = styled.footer`
  font-size: smaller;
  margin-top: 4em;
  padding-bottom: 3em;


  background: linear-gradient(
    30deg,
    ${props => props.theme.color.accent} 10em,
    ${props => transparentize(.5, props.theme.color.accent)} 10em,
    ${props => transparentize(.5, props.theme.color.accent)} 12em,
    transparent 4em
  );
`

const FooterLogo = styled(Logo)`
  margin-bottom: 1.58em;
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
            &copy; {new Date().getUTCFullYear()} Your Gift Hunt.<br />
            All rights reserved.
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Company</h3>
          <p>
            <Link to="/home">Home</Link><br />
            <Link to="/about">About</Link><br />
            {/* <Link to="/blog">Blog</Link> */}
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Legal</h3>
          <p>
            <Link to="/terms">Terms</Link><br />
            <Link to="/privacy">Privacy</Link>
          </p>
        </Column>
        <Column size={3} sSize={6}>
          <h3>Follow us</h3>
          <p>
            <SocialLink rel="noopener noreferrer" target="_blank" href="https://twitter.com/YourGiftHunt">
              <Twitter size={2} />
            </SocialLink>
            <SocialLink rel="noopener noreferrer" target="_blank" href="https://facebook.com/YourGiftHunt">
              <Facebook size={2} />
            </SocialLink>
          </p>
        </Column>
      </Row>
    </Wrapper>
  </Footer>
)
