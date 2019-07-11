import React from "react"
import styled from "styled-components"
import { useYGHPlayerContext } from "ygh-sdk"

import { Menu } from "ygh-ui"
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

const Container = styled.span`
  position: relative;
`

const SignupLink = styled(Link)`
  margin: 1.2em 0 0 1em;

  line-height: 1.58;
  text-decoration: none;
`

const SignInLink = styled.small`
  position: absolute;
  right: 0;
  white-space: nowrap;
`

const Account = () => {
  const { isLoggedIn, user, logoutUser } = useYGHPlayerContext()
  return isLoggedIn ? (
    <Menu.Container>
      <Menu.Toggle as={Avatar} bgImage={user.avatar} />
      <Menu.Items>
        <Menu.Item to={`/${user.username}`}>Profile</Menu.Item>
        <Menu.Item as="a" onClick={logoutUser}>
          Log out
        </Menu.Item>
      </Menu.Items>
    </Menu.Container>
  ) : (
    <Container>
      <SignInLink>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </SignInLink>
      <SignupLink to="/auth/signup">Sign up</SignupLink>
    </Container>
  )
}

export default Account
