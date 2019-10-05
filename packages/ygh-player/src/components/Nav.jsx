import React from "react"
import styled from "styled-components"

import { useYGHPlayerContext } from "ygh-sdk"

import { Link } from "@reach/router"
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

const IndexLink = styled.a`
  text-decoration: none;
`

const StyledLink = styled(IndexLink)`
  margin-left: 1em;
  padding: 1rem 0;
  line-height: 1rem;
  color: ${props => props.theme.color.emphasis};
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

const ButtonContainer = styled.span`
  display: inline-block;
  margin: 0.5rem 0;
`

export default props => {
  const { isLoggedIn } = useYGHPlayerContext()
  return (
    <Nav {...props}>
      <StyledWrapper xlarge>
        <Small>
          <IndexLink href="/">
            <StyledLogo size={3} />
          </IndexLink>
          <MenuContainer>
            <Menu.Toggle>
              <Btn>Menu</Btn>
            </Menu.Toggle>
            <Menu.Items>
              <Menu.Item>
                <Button
                  block
                  size="small"
                  importance="primary"
                  color="primary"
                  as="a"
                  href="/new-game"
                >
                  Create Game
                </Button>
              </Menu.Item>
              <Menu.Item as={Link} to="/showcase">
                Showcase
              </Menu.Item>
              {/* <Menu.Item as="a" href="/pricing">
                Pricing
              </Menu.Item> */}
              <Menu.Item as="a" href="/about">
                About
              </Menu.Item>
              <Menu.Item as="a" href="/contact">
                Contact
              </Menu.Item>
              {isLoggedIn ? (
                <Menu.Item as="a" href="/my-games">
                  My Dashboard
                </Menu.Item>
              ) : (
                <AccountMenuItem>
                  <Button
                    size="tiny"
                    as="a"
                    href="/auth/signup"
                    color="primary"
                    importance="primary"
                  >
                    Sign up
                  </Button>
                  <Button
                    size="tiny"
                    as="a"
                    href="/auth/login"
                    importance="tertiary"
                  >
                    Log in
                  </Button>
                </AccountMenuItem>
              )}
            </Menu.Items>
          </MenuContainer>
        </Small>
        <Large>
          <Float.Left>
            <IndexLink href="/">
              <StyledLogo size={3} />
            </IndexLink>
            <NavLink to="/showcase">Showcase</NavLink>
            {/* <NavLink href="/my-games">Creator</NavLink> */}
            {/* <NavLink href="/pricing">Pricing</NavLink> */}
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Float.Left>
          <Float.Right>
            {!isLoggedIn && <NavLink href="/auth/login">Log in</NavLink>}
            <ButtonContainer>
              <Button
                size="small"
                color="primary"
                importance="primary"
                as="a"
                href="/new-game"
              >
                Create Game
              </Button>
            </ButtonContainer>
            {isLoggedIn && <Account />}
          </Float.Right>
        </Large>
      </StyledWrapper>
    </Nav>
  )
}
