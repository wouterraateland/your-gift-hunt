import React from "react"
import styled from "styled-components"

import useQuery from "hooks/useQuery"
import { useYGHPlayerContext } from "ygh-player/react-hook"

import Helmet from "react-helmet"
import {
  Column,
  FullHeight,
  Loader,
  Message,
  Row,
  VSpace,
  Wrapper
} from "your-gift-hunt/ui"

import NotFoundPage from "pages/404"

import Nav from "components/Nav"
import GameThumb from "components/GameThumb"

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

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.div.attrs(({ avatar }) => ({
  style: {
    backgroundImage: `url(${avatar})`
  }
}))`
  width: 8em;
  height: 8em;
  margin-right: 2em;

  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.large};

  background: #0009 no-repeat center / cover;
`

const Meta = styled.div`
  flex-grow: 1;
`

const Name = styled.h1`
  margin: 0;
`

const Username = styled.strong``

const ActiveUserProfilePage = ({ user, userProfile }) => (
  <Background>
    <Helmet title={`${userProfile.name} | Your Gift Hunt`} />
    <Wrapper>
      <Nav title="← Back" to="/" />
    </Wrapper>
    <Wrapper medium>
      <VSpace.Large />
      <Info>
        <Avatar avatar={userProfile.avatar} />
        <Meta>
          <Name>{userProfile.name}</Name>
          <Username>@{userProfile.username}</Username>
        </Meta>
      </Info>
      <h2>Rooms created ({userProfile.gamesCreated.length})</h2>
      <Row align="left">
        {userProfile.gamesCreated.map(game => (
          <Column key={game.id} size={4} mSize={6}>
            <GameThumb game={game} />
          </Column>
        ))}
      </Row>
      <h2>Rooms played ({userProfile.gamesPlayed.length})</h2>
      <Row align="left">
        {userProfile.gamesPlayed.map(game => (
          <Column key={game.id} size={4} mSize={6}>
            <GameThumb game={game} />
          </Column>
        ))}
      </Row>
    </Wrapper>
  </Background>
)

const UserProfilePage = ({ userSlug }) => {
  const { user, getUserProfile } = useYGHPlayerContext()
  const [{ data: userProfile, error, isLoading }] = useQuery(() =>
    getUserProfile({ userSlug })
  )

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
