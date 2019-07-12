import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Button, Float, Menu, Wrapper } from "ygh-ui"
import { Logo } from "ygh-icons"
import Account from "components/Account"

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

const MenuContainer = styled(Menu.Container)`
  float: right;
  margin-top: 0.8em;
`

const Btn = styled.div`
  padding: 0.5em;
  line-height: 1;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #0001;
`

const AccountMenuItem = styled.div`
  padding: 0.5em 0.5em 0.25em;
  display: flex;
  justify-content: space-around;
`

export default props => (
  <Nav {...props}>
    <StyledWrapper xlarge>
      <Small>
        <IndexLink to="/">
          <StyledLogo size={3} />
          <Name>Your Gift Hunt</Name>
        </IndexLink>
        <MenuContainer>
          <Menu.Toggle>
            <Btn>Menu</Btn>
          </Menu.Toggle>
          <Menu.Items>
            <Menu.Item as="a" href="https://play.yourgifthunt.com">
              Showcase
            </Menu.Item>
            <Menu.Item as="a" href="https://create.yourgifthunt.com">
              Creator
            </Menu.Item>
            <Menu.Item as={Link} to="/pricing">
              Pricing
            </Menu.Item>
            <Menu.Item as={Link} to="/about">
              About
            </Menu.Item>
            <Menu.Item as={Link} to="/contact">
              Contact
            </Menu.Item>
            <AccountMenuItem>
              <Button
                size="tiny"
                as="a"
                href="https://create.yourgifthunt.com/auth/signup"
                importance="primary"
                color="primary"
              >
                Sign up
              </Button>
              <Button
                size="tiny"
                as="a"
                href="https://create.yourgifthunt.com/auth/login"
                importance="tertiary"
              >
                Log in
              </Button>
            </AccountMenuItem>
          </Menu.Items>
        </MenuContainer>
      </Small>
      <Large>
        <Float.Left>
          <IndexLink to="/">
            <StyledLogo size={3} />
            <Name>Your Gift Hunt</Name>
          </IndexLink>
          <NavLink href="https://play.yourgifthunt.com">Showcase</NavLink>
          <NavLink href="https://create.yourgifthunt.com">Creator</NavLink>
          <NavLink as={Link} to="/pricing">
            Pricing
          </NavLink>
          <NavLink as={Link} to="/about">
            About
          </NavLink>
        </Float.Left>
        <Float.Right>
          <NavLink as={Link} to="/contact">
            Contact
          </NavLink>
          <Account />
        </Float.Right>
      </Large>
    </StyledWrapper>
  </Nav>
)
