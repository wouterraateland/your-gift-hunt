import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "utils"

import { useYGHPlayerContext } from "ygh-player/react-hook"

import { navigate } from "@reach/router"
import {
  Align,
  Button,
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
import GamePreview from "components/GamePreview"

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

const Title = styled.h1`
  margin: 0;
`
const Creator = styled.strong`
  margin-top: 0;
`

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
`

const Stat = styled.div`
  padding: 1em;

  text-align: center;
`

const StatValue = styled.strong`
  display: block;

  font-size: 1.5em;
  line-height: 1;
`

const StatLabel = styled.span`
  text-align: center;
`

const ActiveGamePage = ({ game }) => (
  <Background>
    <Wrapper>
      <Nav title="← Back" to="/" />
      <VSpace.Small />
      <Row>
        <Column size={6}>
          <GamePreview src={game.image} />
        </Column>
        <Column size={6}>
          <Title>{game.name}</Title>
          <Creator>{game.creator.name}</Creator>
          <p>{game.description}</p>
          <Align.Right>
            <Button
              importance="primary"
              color="primary"
              onClick={() =>
                navigate(`/play/${game.creator.slug}/${game.slug}`)
              }
            >
              ▷ Play now
            </Button>
          </Align.Right>
        </Column>
        <Column size={6} sSize={12}>
          <Stats>
            <Stat>
              <StatValue>{_.average(game.ratings)}⭐️</StatValue>
              <StatLabel>{_.count(game.ratings)} Ratings</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{game.plays}</StatValue>
              <StatLabel>Times played</StatLabel>
            </Stat>
          </Stats>
        </Column>
        <Column size={6} sSize={12} />
      </Row>
      <h2>Leaderboard</h2>
    </Wrapper>
  </Background>
)

const GamePage = ({ gameSlug, creatorSlug }) => {
  const [game, setGame] = useState(null)
  const { isLoading, error, listPublicGames } = useYGHPlayerContext()

  useEffect(() => {
    listPublicGames().then(games => {
      setGame(
        games.find(
          game => game.slug === gameSlug && game.creator.slug === creatorSlug
        )
      )
    })
  }, [])

  return error ? (
    <Message.Error>
      Something went wrong, please reload. (${error.message})
    </Message.Error>
  ) : isLoading ? (
    <FullHeight>
      <Loader />
    </FullHeight>
  ) : game ? (
    <ActiveGamePage game={game} />
  ) : (
    <NotFoundPage />
  )
}

export default GamePage
