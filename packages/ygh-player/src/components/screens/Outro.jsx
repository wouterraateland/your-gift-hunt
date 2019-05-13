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

export default props => {
  const { game, gameState } = useGame()

  const duration = moment.duration(
    moment(gameState.startedAt).diff(moment(gameState.finishedAt))
  )

  return (
    <OutroScreen {...props}>
      <Align.Center>
        <Wrapper small>
          <h1>
            Well done, you finished in {duration.hours()}-{duration.minutes()}-
            {duration.seconds()}
          </h1>
          <p>{game.outro}</p>
        </Wrapper>
      </Align.Center>
    </OutroScreen>
  )
}
