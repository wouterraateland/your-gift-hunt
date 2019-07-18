import React from "react"
import styled from "styled-components"
import moment from "moment"

import useGame from "hooks/useGame"
import useAuth from "hooks/useAuth"

import { Link } from "@reach/router"
import Base from "./Base"
import { Align, Button, VSpace, Wrapper } from "ygh-ui"
import Rating from "components/Rating"

const OutroScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;

  &,
  p,
  a {
    color: #fffc;
  }

  h1,
  strong {
    color: #fff;
  }
`

const f = x => (x < 10 ? `0${x}` : x)

export default ({ close, ...props }) => {
  const { game, gameState, rateGamePlay } = useGame()
  const { isLoggedIn } = useAuth()

  const duration = moment.duration(gameState.timePlayed)

  return (
    <OutroScreen {...props}>
      <Align.Center>
        <Wrapper.Tiny>
          <h1>Game Complete</h1>
          <p>
            <strong>Time played:</strong> {f(duration.hours())}:
            {f(duration.minutes())}:{f(duration.seconds())}
          </p>
          <p>{game.outro}</p>
          <strong>
            Your rating:{" "}
            <Rating onRate={rateGamePlay} rating={gameState.rating} />
          </strong>
          <VSpace.Large />
          {isLoggedIn ? (
            <Button
              as={Link}
              to={`/${game.creator.slug}/${game.slug}`}
              color="secondary"
              size="large"
              importance="primary"
            >
              View leaderboard
            </Button>
          ) : (
            <Button
              as={Link}
              to={`/auth/login?redirect=/play/${game.creator.slug}/${
                game.slug
              }`}
              color="secondary"
              size="large"
              importance="primary"
            >
              Log in to join leaderboard
            </Button>
          )}
          <VSpace.Medium />
          <Button
            as={Link}
            to="/"
            color="primary"
            size="large"
            importance="primary"
          >
            Play related games
          </Button>
          <p>
            <a href={`/play/${game.creator.slug}/${game.slug}?restart`}>
              Replay game
            </a>
          </p>
        </Wrapper.Tiny>
      </Align.Center>
    </OutroScreen>
  )
}
