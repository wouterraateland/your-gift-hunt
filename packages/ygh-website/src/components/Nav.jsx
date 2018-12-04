import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Wrapper from 'components/ui/Wrapper'
import Float from 'components/ui/Float'

const Nav = styled.nav`
  position: fixed;
  left: 0; top: 0;
  right: 0;

  height: 4em;
  line-height: 1;
  font-size: 1rem;

  background-color: #000;
`

const Img = styled.img`
  display: block;
  height: 1.5em;
  margin: 1.25em 0;
`

const NavLink = styled(Link)`
  padding: 1.5em 0;
  margin-left: 2em;

  color: #fff;

  ${props => props.primary && css`
    font-weight: bold;
    color: ${props => props.theme.color.accent};
  `}
`

export default () => {
  return (
    <Nav>
      <Wrapper>
        <Float.Left>
          <Link to="/">
            <Img src="/logos/logo-thumb-light.svg" alt="Your Gift Hunt" />
          </Link>
        </Float.Left>
        <Float.Right>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink primary to="/demo">Play a Demo Hunt for free</NavLink>
        </Float.Right>
      </Wrapper>
    </Nav>
  )
}
