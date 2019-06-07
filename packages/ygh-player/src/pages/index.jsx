import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { useYGHPlayerContext } from "ygh-player/react-hook"

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

const StyledLogo = styled(Logo)`
  color: #000;
  .background {
    fill: #fff;
  }
`

const Introduction = styled.p`
  max-width: 30em;
  padding: 1em;
  margin: auto;
  border-radius: ${props => props.theme.borderRadius};

  text-align: center;

  background: #0001;
`

const ActiveIndexPage = ({ games }) => (
  <Background>
    <Wrapper>
      <Nav
        as="a"
        href="https://yourgifthunt.com"
        title={
          <>
            <StyledLogo size={1.58} />
            &nbsp;&nbsp;&nbsp;&nbsp;Your Gift Hunt Showcase
          </>
        }
      />
      <VSpace.Large />
      <Introduction>
        Escape room games made by the community, for everyone.
      </Introduction>
      <VSpace.Large />
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
  const [publicGames, setPublicGames] = useState([])
  const { isLoading, error, listPublicGames } = useYGHPlayerContext()

  useEffect(() => {
    listPublicGames().then(setPublicGames)
  }, [])

  return error ? (
    <Message.Error>
      Something went wrong, please reload. (${error.message})
    </Message.Error>
  ) : isLoading ? (
    <FullHeight>
      <Loader />
    </FullHeight>
  ) : (
    <ActiveIndexPage games={publicGames} />
  )
}

export default IndexPage
