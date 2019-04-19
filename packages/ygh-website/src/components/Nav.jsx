import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Wrapper, Float } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"
import Menu from "components/Menu"

const Nav = styled.nav`
  padding: 1em 0;
`

const StyledWrapper = styled(Wrapper)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 2rem;
    bottom: -1em;
    right: 2rem;
    border-bottom: 0.1em solid #0001;
  }

  &::after {
    content: "";
    display: block;
    clear: both;
  }
`

const StyledLogo = styled(Logo)`
  float: left;

  color: #000d;

  .background {
    fill: #fff;
  }
`

const Name = styled.h1`
  margin: 0.8rem 0 0.8rem 3.6rem;
  white-space: nowrap;

  font-size: 1.5rem;
`

const IndexLink = styled(Link)`
  text-decoration: none;
`

const StyledLink = styled(IndexLink)`
  margin: 1.2em 0 0 1em;
`

const NavLink = props => <StyledLink as={props.href ? "a" : Link} {...props} />

const Small = styled.div`
  display: none;
  @media (max-width: 45em) {
    display: block;
  }
`

const Large = styled.div`
  display: block;
  @media (max-width: 45em) {
    display: none;
  }
`

export default props => (
  <Nav {...props}>
    <StyledWrapper xlarge>
      <Small>
        <StyledLogo size={3} />
        <Menu>
          <Menu.Toggle>Menu</Menu.Toggle>
          <Menu.ItemList>
            <Menu.Item to="/products">Products</Menu.Item>
            <Menu.Item href="https://play.yourgifthunt.com">Showcase</Menu.Item>
            <Menu.Item to="/docs">Docs</Menu.Item>
            <Menu.Item to="/contact">Contact</Menu.Item>
            <Menu.Item href="https://create.yourgifthunt.com">Log in</Menu.Item>
          </Menu.ItemList>
        </Menu>
      </Small>
      <Large>
        <Float.Left>
          <IndexLink to="/">
            <StyledLogo size={3} />
            <Name>Your Gift Hunt</Name>
          </IndexLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink href="https://play.yourgifthunt.com">Showcase</NavLink>
          <NavLink to="/docs">Docs</NavLink>
        </Float.Left>
        <Float.Right>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink href="https://create.yourgifthunt.com">Log in</NavLink>
        </Float.Right>
      </Large>
    </StyledWrapper>
  </Nav>
)
