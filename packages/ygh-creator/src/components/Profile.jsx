import React from 'react'
import styled from 'styled-components'
import { withFirebase } from 'react-redux-firebase'
import { Link } from '@reach/router'

import Menu from 'components/Menu'

const Avatar = styled.div`
  width: 3em;
  height: 3em;

  border-radius: 100%;

  background: ${props => props.theme.color.text} url(${props => props.src}) no-repeat center / cover;
`

const Profile = ({ firebase }) => {
  return (
    <Menu.Container>
      <Avatar src={null} />
      <Menu>
        <Menu.Item as={Link} to="/profile">Profile</Menu.Item>
        <Menu.Item onClick={() => firebase.logout()}>Log out</Menu.Item>
      </Menu>
    </Menu.Container>
  )
}

export default withFirebase(Profile)
