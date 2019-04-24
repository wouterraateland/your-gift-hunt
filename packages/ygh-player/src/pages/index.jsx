import React from "react"
import styled from "styled-components"
import Api from "ygh-player/Api"

import useAsync from "hooks/useAsync"

import Theme from "containers/Theme"
import {
  Align,
  Column,
  FullHeight,
  Loader,
  Message,
  Row,
  VSpace,
  Wrapper
} from "your-gift-hunt/ui"
import { MailchimpForm } from "your-gift-hunt/components"
import { Logo } from "your-gift-hunt/icons"
import GameThumb from "components/GameThumb"

const api = new Api()

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

const StyledLogo = styled(Logo)`
  color: #000;
  .background {
    fill: #fff;
  }
`

const ActiveIndexPage = ({ games }) => (
  <Background>
    <Wrapper>
      <Align.Center>
        <h1>
          <a href="https://yourgifthunt.com">
            <StyledLogo size={1.58} />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;Your Gift Hunt Showcase
        </h1>
        <p>Games made by the community</p>
      </Align.Center>
      <VSpace />
      <Row>
        {games.map(game => (
          <Column key={game.id} size={4} mSize={6} sSize={12}>
            <GameThumb game={game} />
          </Column>
        ))}
      </Row>
      <Align.Center>
        <h2>Subscribe for Beta access</h2>
        <p>And be the first to create your own unique puzzle games</p>
        <MailchimpForm />
      </Align.Center>
    </Wrapper>
  </Background>
)

const IndexPage = () => {
  const { isLoading, error, data } = useAsync(api.listPublicGames)

  return (
    <Theme>
      {error ? (
        <Message.Error>
          Something went wrong, please try again. (${error.message})
        </Message.Error>
      ) : isLoading ? (
        <FullHeight>
          <Loader />
        </FullHeight>
      ) : (
        <ActiveIndexPage games={data} />
      )}
    </Theme>
  )
}

export default IndexPage
