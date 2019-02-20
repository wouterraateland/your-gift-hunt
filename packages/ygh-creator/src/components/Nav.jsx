import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import { Wrapper, Float } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"

import Profile from "components/Profile"

const StyledNav = styled.nav`
  position: relative;
  height: 12em;
  padding: 1em 0;
  margin-bottom: -7em;

  flex-shrink: 0;

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
const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 2.5em;

  transform: translate(-50%, -50%);
`

const NavItem = styled(Link)`
  cursor: pointer;

  display: inline-block;
  margin-right: 1em;

  vertical-align: middle;
  font-weight: bold;
`

const Nav = ({ title, children, items = [] }) => {
  return (
    <StyledNav>
      <Wrapper>
        <Float.Left>
          <Link to="/">
            <StyledLogo size={3} />
          </Link>
          <Title>{title}</Title>
        </Float.Left>
        <Center>{children}</Center>
        <Float.Right>
          {items.map(({ label, ...item }, i) => (
            <NavItem key={i} {...item}>
              {label}
            </NavItem>
          ))}
          <Profile />
        </Float.Right>
      </Wrapper>
    </StyledNav>
  )
}

export default Nav
