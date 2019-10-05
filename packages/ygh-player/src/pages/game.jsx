import React from "react"
import styled from "styled-components"
import { navigate, Link } from "@reach/router"
import _ from "ygh-utils"

import { useQuery } from "ygh-hooks"
import { useYGHPlayerContext } from "ygh-sdk"

import Helmet from "react-helmet"
import {
  Align,
  Button,
  Column,
  Loader,
  Menu,
  Message,
  Row,
  VSpace,
  Wrapper
} from "ygh-ui"

import NotFoundPage from "pages/404"

import Layout from "layouts/Page"
import GamePreview from "components/GamePreview"
import Leaderboard from "components/Leaderboard"

const Title = styled.h1`
  margin: 0;
`
const Creator = styled(Link)`
  margin-top: 0;

  font-weight: bold;
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
  <Layout>
    <Helmet
      title={`${game.name} by ${
        game.creator ? game.creator.name : "anonymous"
      } | Escape Room Creator`}
    />
    <VSpace.Large />
    <Wrapper.Medium>
      <Row align="left">
        <Column size={6}>
          <GamePreview src={game.image} progress={game.progress} />
        </Column>
        <Column size={6}>
          <Title>{game.name}</Title>
          {game.creator && (
            <Creator to={`/user/${game.creator.id}`}>
              {game.creator.name}
            </Creator>
          )}
          <p>{game.description}</p>
          <Align.Right>
            {game.progress !== null &&
              game.progress !== 1 &&
              (game.privacy === "PUBLIC" || game.accessType === "CODE") && (
                <Menu.Container>
                  <Menu.Toggle />
                  <Menu.Items>
                    <Menu.Item to={`/play/${game.id}?restart`}>
                      Restart
                    </Menu.Item>
                  </Menu.Items>
                </Menu.Container>
              )}
            <Button
              importance="primary"
              color="primary"
              disabled={
                game.progress === 1 &&
                !(game.privacy === "PUBLIC" || game.accessType === "CODE")
              }
              onClick={() =>
                navigate(
                  `/play/${game.id}${game.progress === 1 ? "?restart" : ""}`
                )
              }
            >
              ▷{" "}
              {gamePlays.length > 0
                ? game.progress === 1
                  ? "Play again"
                  : "Resume"
                : "Play now"}
            </Button>
            <VSpace.Small />
          </Align.Right>
        </Column>
        <Column size={6} sSize={12}>
          <Stats>
            <Stat>
              <StatValue>
                {_.average(game.ratings)
                  .toFixed(1)
                  .replace(".", ",")}
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
    </Wrapper.Medium>
  </Layout>
)

const GamePage = ({ gameId }) => {
  const { listGames, gamePlays } = useYGHPlayerContext()
  const [{ data, error, isLoading }] = useQuery(listGames)

  const game = data ? data.find(game => game.id === gameId) : null

  return error ? (
    <Layout>
      <Message.Error>
        Something went wrong, please reload. (${error.message})
      </Message.Error>
    </Layout>
  ) : isLoading ? (
    <Layout>
      <Loader />
    </Layout>
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
