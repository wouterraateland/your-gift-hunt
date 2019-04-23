import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"

import useAuth from "hooks/useAuth"

import Menu from "components/Menu"

const Avatar = styled.div`
  width: 3em;
  height: 3em;

  border-radius: 100%;

  background: ${props => props.theme.color.text} url(${props => props.src})
    no-repeat center / cover;
`

const Profile = () => {
  const { logoutUser } = useAuth()

  return (
    <Menu.Container>
      <Avatar src={null} />
      <Menu>
        <Menu.Item as={Link} to="/profile">
          Profile
        </Menu.Item>
        <Menu.Item onClick={logoutUser}>Log out</Menu.Item>
      </Menu>
    </Menu.Container>
  )
}

export default Profile
