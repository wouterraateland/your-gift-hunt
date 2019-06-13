import React from "react"
import styled from "styled-components"
import moment from "moment"

import useGame from "hooks/useGame"

import Base from "./Base"
import { Align, Wrapper } from "your-gift-hunt/ui"

const OutroScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fffc;

  h1 {
    color: #fff;
  }
`

const f = x => (x < 10 ? `0${x}` : x)

export default ({ close, ...props }) => {
  const { game, gameState } = useGame()

  const duration = moment.duration(gameState.timePlayed)

  return (
    <OutroScreen {...props}>
      <Align.Center>
        <Wrapper small>
          <h1>Game Complete</h1>
          <p>
            Time: {f(duration.hours())}:{f(duration.minutes())}:
            {f(duration.seconds())}
          </p>
          <p>{game.outro}</p>
        </Wrapper>
      </Align.Center>
    </OutroScreen>
  )
}
