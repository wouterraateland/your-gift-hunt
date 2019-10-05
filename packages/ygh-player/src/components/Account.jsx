import React from "react"
import styled from "styled-components"
import { useYGHPlayerContext } from "ygh-sdk"

import { Menu } from "ygh-ui"

const Avatar = styled.div`
  display: inline-block;
  width: 2em;
  height: 2em;
  margin: 0.5rem 0 0.5rem 1em;
  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.small};

  vertical-align: middle;

  background: url(${props => props.bgImage}) no-repeat center / cover;

  &::before {
    display: none;
  }
`

const Account = () => {
  const { isLoggedIn, user, logoutUser } = useYGHPlayerContext()
  return isLoggedIn ? (
    <Menu.Container>
      <Menu.Toggle as={Avatar} bgImage={user.avatar} />
      <Menu.Items>
        <Menu.Item as="a" href="/my-games">
          My games
        </Menu.Item>
        <Menu.Item as="a" href="/profile">
          Profile
        </Menu.Item>
        <Menu.Item onClick={logoutUser}>Log out</Menu.Item>
      </Menu.Items>
    </Menu.Container>
  ) : null
}

export default Account
