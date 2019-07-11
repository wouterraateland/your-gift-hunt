import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import useAuth from "hooks/useAuth"

import { Menu } from "ygh-ui"

const Avatar = styled.div`
  width: 3em;
  height: 3em;

  border-radius: 100%;

  background: ${props => props.theme.color.text} url(${props => props.src})
    no-repeat center / cover;
`

const Profile = () => {
  const { user, logoutUser } = useAuth()

  return (
    <Menu.Container>
      <Menu.Toggle>
        <Avatar src={user.avatar} />
      </Menu.Toggle>
      <Menu.Items>
        <Menu.Item as={Link} to="/profile">
          Profile
        </Menu.Item>
        <Menu.Item onClick={logoutUser}>Log out</Menu.Item>
      </Menu.Items>
    </Menu.Container>
  )
}

export default Profile
