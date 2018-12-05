import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Wrapper from 'components/ui/Wrapper'
import Float from 'components/ui/Float'

import logoThumb from 'images/logo-thumb-light.svg'

const Nav = styled.nav`
  position: fixed;
  left: 0; top: 0;
  right: 0;
  z-index: 1;

  height: 4rem;
  line-height: 1;
  font-size: 1rem;

  background-color: #000;
`

const Img = styled.img`
  display: block;
  height: 1.5rem;
  margin: 1.25rem 0;
`

const NavLink = styled(Link)`
  padding: 1.5rem 0;
  margin-left: 2rem;

  color: #fff;

  ${props => props.primary && css`
    font-weight: bold;
    color: ${props => props.theme.color.accent};
  `}

  ${props => !props.primary && css`
    @media (max-width: 720px) {
      display: none;
    }
  `}

  @media (max-width: 480px) {
    margin-left: 0;
    font-size: .7em;
    line-height: 1rem;
  }
`

export default () => {
  return (
    <Nav>
      <Wrapper>
        <Float.Left>
          <Link to="/">
            <Img src={logoThumb} alt="Your Gift Hunt" />
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
