import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
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
  height: 1.5em;
  margin: 1.25em 0;
`

const NavLink = styled(Link)`
  padding: 1.5rem 0;
  margin-left: 2rem;

  color: #fff;

  &:hover {
    color: ${darken(.1, '#fff')};
  }

  ${props => props.primary && css`
    font-weight: bold;
    color: ${props => props.theme.color.accent};

    &:hover {
      color: ${props => darken(.1, props.theme.color.accent)};
    }
  `}

  ${props => !props.primary && css`
    @media (max-width: 45em) {
      display: block;
      margin-left: 0;

      text-align: center;

      background-color: #000;

      transition:
        padding .2s ease-out,
        opacity .2s ease-out,
        font-size .2s ease-out;

      transition-delay: ${props => props.index * .1}s;

      will-change: padding, opacity, font-size;
    }
  `}

  ${props => props.primary && css`
    @media (max-width: 30em) {
      margin-left: 0;
    }

    @media (max-width: 23em) {
      font-size: .8em;
    }
  `}
`

const MenuToggle = styled.div`
  @media (max-width: 45em) {
    cursor: pointer;

    position: relative;

    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin: 1.25rem 0 1.25rem 1rem;

    background: linear-gradient(#fff, #fff) no-repeat center / 100% .15rem;

    transition: background-size .4s ease-out;

    &::before,
    &::after {
      content: '';

      position: absolute;
      left: 0; top: 0;
      right: 0; bottom: 0;

      width: 100%;
      height: .15rem;
      margin: auto;

      background-color: #fff;

      transition: transform .4s ease-out;
    }

    &::before { transform: translate(0, .5rem); }
    &::after { transform: translate(0, -.5rem); }

    ${props => props.open && css`
      background-size: 0 0;

      &::before { transform: rotate(225deg); }
      &::after { transform: rotate(-225deg); }
    `}
  }
`

const Menu = styled.div`
  @media (max-width: 45em) {
    position: absolute;
    left: 0; top: 4rem;
    right: 0;

    ${props => !props.open && css`
      ${NavLink} {
        font-size: 0;
        opacity: 0;
        padding: 0;
      }
    `}
  }

  @media (min-width: 45em) {
    float: right;
  }
`

export default () => {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(menuOpen => !menuOpen)
  }

  return (
    <Nav>
      <Wrapper>
        <Float.Left>
          <Link to="/">
            <Img src={logoThumb} alt="Your Gift Hunt" />
          </Link>
        </Float.Left>
        <Float.Right>
          <NavLink primary to="/demo">Play a Demo Hunt for free</NavLink>
          <MenuToggle open={menuOpen} onClick={toggleMenu} />
        </Float.Right>
        <Menu open={menuOpen}>
          <NavLink index={0} to="/about">About</NavLink>
          <NavLink index={1} to="/blog">Blog</NavLink>
          <NavLink index={2} to="/pricing">Pricing</NavLink>
          <NavLink index={2} to="/faq">FAQ</NavLink>
        </Menu>
      </Wrapper>
    </Nav>
  )
}
