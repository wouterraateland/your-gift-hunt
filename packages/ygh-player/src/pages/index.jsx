import React, { useEffect, useMemo, useState } from "react"
import styled, { css } from "styled-components"

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

const Introduction = styled.div`
  max-width: 30em;
  padding: 1em;
  margin: auto;
  border-radius: ${props => props.theme.borderRadius};

  text-align: center;

  background: #0001;
`

const GameFilters = styled.div`
  padding-bottom: 1em;
`

const GameFilter = styled.strong`
  cursor: pointer;
  ${props =>
    props.isSelected &&
    css`
      border-bottom: 0.1em solid;
    `}
`

const ActiveIndexPage = ({ games, gamePlays, user }) => {
  const [type, setType] = useState("public")

  const gameFilters = useMemo(
    () => ({
      public: game => game.privacy === "PUBLIC",
      progress: game => game.progress !== null && game.progress !== 1,
      completed: game => game.progress === 1
    }),
    [gamePlays]
  )

  const visibleGames = useMemo(() => games.filter(gameFilters[type]), [
    type,
    games,
    gamePlays
  ])

  return (
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
          <GameFilters>
            <GameFilter
              isSelected={type === "public"}
              onClick={() => setType("public")}
            >
              Public games
            </GameFilter>
            {" / "}
            <GameFilter
              isSelected={type === "progress"}
              onClick={() => setType("progress")}
            >
              In progress
            </GameFilter>
            {" / "}
            <GameFilter
              isSelected={type === "completed"}
              onClick={() => setType("completed")}
            >
              Completed games
            </GameFilter>
          </GameFilters>
          <p>
            {type === "public" &&
              "Escape room games made by the community, for everyone."}
            {type === "accessible" &&
              "Games you have access to, are playing or have played."}
            {type === "creator" && "Games created by you."}
          </p>
        </Introduction>
        <VSpace.Large />
        <Row>
          {visibleGames.map(game => (
            <Column key={game.id} size={4} mSize={6}>
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
}

const IndexPage = () => {
  const [games, setGames] = useState([])
  const { isLoading, error, listGames, gamePlays, user } = useYGHPlayerContext()

  useEffect(() => {
    listGames().then(setGames)
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
    <ActiveIndexPage games={games} gamePlays={gamePlays} user={user} />
  )
}

export default IndexPage
