import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import { Wrapper, Float } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"

import Profile from "components/Profile"

const StyledNav = styled.nav`
  height: 12em;
  padding: 1em 0;
  margin-bottom: -7em;

  background-color: ${props => props.theme.color.accent};
`

const StyledLogo = styled(Logo)`
  color: #000;
  .background {
    fill: #fff;
  }
`

const Title = styled.h1`
  display: inline-block;
  margin: 0 0 0 1ch;
  line-height: 3rem;

  font-weight: bold;
`

const NavItem = styled(Link)``

const Nav = ({ title, items = [] }) => {
  return (
    <StyledNav>
      <Wrapper>
        <Float.Left>
          <Link to="/">
            <StyledLogo size={3} />
          </Link>
          <Title>{title}</Title>
        </Float.Left>
        <Float.Right>
          {items.map((item, i) => (
            <NavItem key={i} {...item} />
          ))}
          <Profile />
        </Float.Right>
      </Wrapper>
    </StyledNav>
  )
}

export default Nav
