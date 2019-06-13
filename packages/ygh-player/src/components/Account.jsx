import React from "react"
import styled from "styled-components"
import { useYGHPlayerContext } from "ygh-player/react-hook"

import { Menu } from "your-gift-hunt/ui"
import { Link } from "@reach/router"

const Avatar = styled.div`
  display: inline-block;
  width: 2em;
  height: 2em;
  margin: 1em 0 0 1em;
  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.small};

  vertical-align: middle;

  background: url(${props => props.bgImage}) no-repeat center / cover;

  &::before {
    display: none;
  }
`

const StyledLink = styled(Link)`
  margin: 1.2em 0 0 1em;

  line-height: 1.58;
  text-decoration: none;
`

const Account = () => {
  const { isLoggedIn, user, logoutUser } = useYGHPlayerContext()
  return isLoggedIn ? (
    <>
      <Menu.Container>
        <Menu.Toggle as={Avatar} bgImage={user.avatar} />
        <Menu.Items>
          <Menu.Item to={`/${user.username}`}>Profile</Menu.Item>
          <Menu.Item as="a" onClick={logoutUser}>
            Log out
          </Menu.Item>
        </Menu.Items>
      </Menu.Container>
    </>
  ) : (
    <StyledLink to="/auth/login">Login</StyledLink>
  )
}

export default Account
