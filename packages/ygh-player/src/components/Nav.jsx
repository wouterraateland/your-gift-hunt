import React from "react"
import styled from "styled-components"

import { useYGHPlayerContext } from "ygh-player/react-hook"

import { Link } from "@reach/router"
import { Button, Float, Menu, Wrapper } from "your-gift-hunt/ui"
import { Logo } from "your-gift-hunt/icons"
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
  line-height: 1.1;
`

const IndexLink = styled.a`
  text-decoration: none;
`

const StyledLink = styled(IndexLink)`
  margin: 1.2em 0 0 1em;
  line-height: 1.58;
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

export default props => {
  const { isLoggedIn, user, logoutUser } = useYGHPlayerContext()
  return (
    <Nav {...props}>
      <StyledWrapper xlarge>
        <Small>
          <IndexLink href="https://yourgifthunt.com">
            <StyledLogo size={3} />
            <Name>Your Gift Hunt</Name>
          </IndexLink>
          <MenuContainer>
            <Menu.Toggle>
              <Btn>Menu</Btn>
            </Menu.Toggle>
            <Menu.Items>
              <Menu.Item to="/">Showcase</Menu.Item>
              <Menu.Item as="a" href="https://create.yourgifthunt.com">
                Creator
              </Menu.Item>
              <Menu.Item as="a" href="https://yourgifthunt.com/pricing">
                Pricing
              </Menu.Item>
              <Menu.Item as="a" href="https://yourgifthunt.com/about">
                About
              </Menu.Item>
              <Menu.Item as="a" href="https://yourgifthunt.com/contact">
                Contact
              </Menu.Item>
              {isLoggedIn ? (
                <>
                  <Menu.Item to={`/${user.username}`}>Profile</Menu.Item>
                  <Menu.Item as="a" onClick={logoutUser}>
                    Log out
                  </Menu.Item>
                </>
              ) : (
                <AccountMenuItem>
                  <Button
                    size="tiny"
                    as={Link}
                    to="/auth/signup"
                    color="primary"
                    importance="primary"
                  >
                    Sign up
                  </Button>
                  <Button
                    size="tiny"
                    as={Link}
                    to="/auth/login"
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
            <IndexLink href="https://yourgifthunt.com">
              <StyledLogo size={3} />
              <Name>Your Gift Hunt</Name>
            </IndexLink>
            <NavLink to="/">Showcase</NavLink>
            <NavLink href="https://create.yourgifthunt.com">Creator</NavLink>
            <NavLink href="https://yourgifthunt.com/pricing">Pricing</NavLink>
            <NavLink href="https://yourgifthunt.com/about">About</NavLink>
          </Float.Left>
          <Float.Right>
            <NavLink href="https://yourgifthunt.com/contact">Contact</NavLink>
            <Account />
          </Float.Right>
        </Large>
      </StyledWrapper>
    </Nav>
  )
}
