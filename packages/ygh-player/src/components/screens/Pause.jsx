import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import moment from "moment"

import useGame from "hooks/useGame"
import useAuth from "hooks/useAuth"

import { Link } from "@reach/router"
import Base from "./Base"
import { Align, VSpace, Wrapper } from "ygh-ui"

const PauseScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fffc;

  h1,
  strong,
  a {
    color: #fff;
  }

  span {
    cursor: pointer;
  }
`

const AccountContainer = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  color: ${props => props.theme.color.text};
`

const pad = x => x.toString().padStart(2, "0")

export default props => {
  const { game, gameState } = useGame()
  const { isLoggedIn } = useAuth()

  const getPlayTime = useCallback(
    () =>
      moment.duration(gameState.timePlayed + Date.now() - gameState.timestamp),
    [gameState.timestamp, gameState.timePlayed]
  )
  const [playTime, setPlayTime] = useState(getPlayTime())

  const updatePlayTime = useCallback(() => {
    setPlayTime(getPlayTime())
  }, [gameState.timestamp, gameState.timePlayed])

  useEffect(() => {
    const i = setInterval(updatePlayTime, 1000)
    return () => {
      clearInterval(i)
    }
  }, [gameState.timestamp, gameState.timePlayed])

  return (
    <PauseScreen {...props}>
      {!isLoggedIn && (
        <AccountContainer>
          <Link
            to={`/auth/login?redirect=/play/${game.creator.slug}/${game.slug}`}
          >
            Log in
          </Link>
        </AccountContainer>
      )}
      <Align.Center>
        <Wrapper.Tiny>
          <h1>Game paused</h1>
          <p>
            <strong>Time playing:</strong> {playTime.hours()}:
            {pad(playTime.minutes())}:{pad(playTime.seconds())}
          </p>
          <VSpace.Large />
          <p>
            <a href={`/play/${game.creator.slug}/${game.slug}?restart`}>
              Restart
            </a>
          </p>
          <p>
            <Link to={`/${game.creator.slug}/${game.slug}`}>Leaderboard</Link>
          </p>
          <p>
            <span onClick={props.close}>Resume</span>
          </p>
        </Wrapper.Tiny>
      </Align.Center>
    </PauseScreen>
  )
}
