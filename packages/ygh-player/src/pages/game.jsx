import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { navigate } from "@reach/router"
import _ from "utils"

import useAsync from "hooks/useAsync"
import { useYGHPlayerContext } from "ygh-player/react-hook"

import Helmet from "react-helmet"
import {
  Align,
  Button,
  Column,
  FullHeight,
  Loader,
  Menu,
  Message,
  Row,
  VSpace,
  Wrapper
} from "your-gift-hunt/ui"

import NotFoundPage from "pages/404"

import Nav from "components/Nav"
import GamePreview from "components/GamePreview"
import Leaderboard from "components/Leaderboard"

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
  padding: 1em 0;

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

const ActiveGamePage = ({ game, gamePlays }) => (
  <Background>
    <Helmet title={`${game.name} by ${game.creator.name} | Your Gift Hunt`} />
    <Wrapper>
      <Nav title="← Back" to="/" />
      <VSpace.Small />
      <Row align="left">
        <Column size={6}>
          <GamePreview src={game.image} />
        </Column>
        <Column size={6}>
          <Title>{game.name}</Title>
          <Creator>{game.creator.name}</Creator>
          <p>{game.description}</p>
          <Align.Right>
            {gamePlays.length > 0 &&
              (game.privacy === "PUBLIC" || game.accessType === "CODE") && (
                <Menu.Container>
                  <Menu.Toggle />
                  <Menu.Items>
                    <Menu.Item to={`/play/${game.creator.slug}/${game.slug}`}>
                      Restart
                    </Menu.Item>
                  </Menu.Items>
                </Menu.Container>
              )}
            <Button
              importance="primary"
              color="primary"
              onClick={() =>
                navigate(`/play/${game.creator.slug}/${game.slug}`)
              }
            >
              ▷ {gamePlays.length > 0 ? "Resume" : "Play now"}
            </Button>
            <VSpace.Small />
          </Align.Right>
        </Column>
        <Column size={6} sSize={12}>
          <Stats>
            <Stat>
              <StatValue>
                {_.average(game.ratings)}
                <span role="img" aria-label="rating">
                  ⭐️
                </span>
              </StatValue>
              <StatLabel>{_.count(game.ratings)} Ratings</StatLabel>
            </Stat>
            <Stat>
              <StatValue>{game.plays}</StatValue>
              <StatLabel>Times played</StatLabel>
            </Stat>
          </Stats>
        </Column>
        <Column size={6} sSize={12} />
        <Column size={6} mSize={12}>
          <h2>Leaderboard</h2>
          <Leaderboard game={game} />
        </Column>
      </Row>
    </Wrapper>
  </Background>
)

const GamePage = ({ gameSlug, creatorSlug }) => {
  const [game, setGame] = useState(null)
  const [{ isLoading }, runAsync] = useAsync()
  const { error, listGames, gamePlays } = useYGHPlayerContext()

  const loadGame = useCallback(
    runAsync(async () => {
      const games = await listGames()
      setGame(
        games.find(
          game => game.slug === gameSlug && game.creator.slug === creatorSlug
        )
      )
    }),
    []
  )

  useEffect(() => {
    loadGame()
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
    <ActiveGamePage
      game={game}
      gamePlays={gamePlays.filter(gamePlay => gamePlay.game.id === game.id)}
    />
  ) : (
    <NotFoundPage />
  )
}

export default GamePage
