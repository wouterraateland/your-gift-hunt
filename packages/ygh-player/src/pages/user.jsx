import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import useAsync from "hooks/useAsync"
import { useYGHPlayerContext } from "ygh-player/react-hook"

import Helmet from "react-helmet"
import { FullHeight, Loader, Message, VSpace, Wrapper } from "your-gift-hunt/ui"

import NotFoundPage from "pages/404"

import Nav from "components/Nav"

const Background = styled(FullHeight)`
  padding: 1em 0;

  background: linear-gradient(
      150deg,
      ${props => props.theme.color.accent} 30vw,
      #ebedf5 30vw,
      #ebedf5 40vw,
      transparent 40vw
    )
    no-repeat top left;
`

const ActiveUserProfilePage = ({ user, userProfile }) => (
  <Background>
    <Helmet title={`${userProfile.user.name} | Your Gift Hunt`} />
    <Wrapper>
      <Nav title="← Back" to="/" />
      <VSpace.Small />
    </Wrapper>
  </Background>
)

const UserProfilePage = ({ userSlug }) => {
  const [userProfile, setUserProfile] = useState(null)
  const [{ error, isLoading }, runAsync] = useAsync()
  const { user, getUserProfile } = useYGHPlayerContext()

  const loadUserProfile = useCallback(
    runAsync(userSlug => getUserProfile({ userSlug }).then(setUserProfile)),
    []
  )

  useEffect(() => {
    loadUserProfile(userSlug)
  }, [userSlug])

  return error ? (
    <Message.Error>
      Something went wrong, please reload. (${error.message})
    </Message.Error>
  ) : isLoading ? (
    <FullHeight>
      <Loader />
    </FullHeight>
  ) : userProfile ? (
    <ActiveUserProfilePage user={user} userProfile={userProfile} />
  ) : (
    <NotFoundPage />
  )
}

export default UserProfilePage
