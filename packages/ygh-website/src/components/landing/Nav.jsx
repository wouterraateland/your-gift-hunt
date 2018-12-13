import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { lighten, darken } from 'polished'
import { Link } from 'gatsby'

import { Wrapper, Float } from 'components/ui'
import { Logo } from 'components/icons'

const StyledLink = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`

const StyledLogo = styled(Logo)`
  margin: 1em 0;
`

const NavLink = styled(StyledLink)`
  padding: 2.5rem 0;
  margin-left: 2rem;

  opacity: ${props => props.importance === 'primary' ? 1 : .8};

  &:hover {
    opacity: ${props => props.importance === 'primary' ? .8 : .6};
  }

  ${props => props.importance === 'primary' && css`
    font-weight: bold;

    &::after {
      content: '→';
      margin-left: .5em;
    }
  `}

  color: inherit;

  @media (max-width: 45em) {
    display: block;
    width: 10em;
    padding: 1em;
    margin-left: 0;

    &:nth-child(2n) {
      background-color: #0001;
    }

    opacity: 1 !important;

    color: ${lighten(.2, '#000')};

    &:hover {
      background-color: #0002;
    }

    ${props => props.importance === 'primary' && css`
      && {
        background-color: ${props.theme.color.accent};
      }

      &:hover {
        background-color: ${darken(.1, props.theme.color.accent)};
      }
    `}
  }
`

const MenuToggle = styled.div`
  @media (max-width: 45em) {
    cursor: pointer;

    position: relative;
    z-index: 1;

    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin: 1.25rem 0 1.25rem 1rem;

    background: linear-gradient(currentColor, currentColor) no-repeat center / 100% .15rem;

    transition:
      color ${props => props.open ? 1 : .2}s ${props => props.open ? .2 : 0}s ease-out,
      background-size .4s ease-out;

    &::before,
    &::after {
      content: '';

      position: absolute;
      left: 0; top: 0;
      right: 0; bottom: 0;

      width: 100%;
      height: .15rem;
      margin: auto;

      background-color: currentColor;

      transition: transform .4s ease-out;
    }

    &::before { transform: translate(0, .5rem); }
    &::after { transform: translate(0, -.5rem); }

    ${props => props.open && css`
      color: #fff;

      background-size: 0 0;

      &::before { transform: rotate(225deg); }
      &::after { transform: rotate(-225deg); }
    `}
  }
`

const Menu = styled.div`
  @media (max-width: 45em) {
    position: absolute;
    top: 4em;
    right: 1em;

    background: #fff;
    box-shadow: 0 0 60em 60em ${props => props.open ? '#0004' : '#0000'};

    transform-origin: 80% 0;
    transform: scale(${props => props.open ? 1 : 0});

    transition:
      transform .2s ${props => props.open ? 0 : .2}s ease-out,
      box-shadow ${props => props.open ? 1 : .2}s ${props => props.open ? .2 : 0}s ease-out;
  }

  @media (min-width: 45em) {
    float: right;
  }
`

const Nav = styled.nav`
  position: absolute;
  left: 0; top: 0;
  right: 0;
  z-index: 1;

  height: 6em;
  line-height: 1;

  color: ${props => props.dark ? '#fff' : '#000'};

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  ${props => props.index && css `
    @media (max-width: 45rem) {
      color: #fff;
    }
  `}

  ${props => props.index && css`
    @media (min-width: 45rem) {
      ${Menu} {
        color: #fff;
      }
    }
  `}
`

export default props => {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(menuOpen => !menuOpen)
  }

  return (
    <Nav {...props}>
      <Wrapper xlarge>
        <Float.Left>
          <StyledLink to="/">
            <StyledLogo size={4} />
          </StyledLink>
        </Float.Left>
        <Float.Right>
          <MenuToggle open={menuOpen} onClick={toggleMenu} />
        </Float.Right>
        <Menu open={menuOpen}>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/auth/login">Log in</NavLink>
          <NavLink to="/auth/signup" importance="primary">Sign up</NavLink>
        </Menu>
      </Wrapper>
    </Nav>
  )
}
