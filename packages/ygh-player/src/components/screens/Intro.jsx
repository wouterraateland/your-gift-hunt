import React, { useCallback } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"

import Base from "./Base"
import { Align, Button, VSpace, Wrapper } from "your-gift-hunt/ui"

const IntroScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fffc;

  h1 {
    color: #fff;
  }
`

export default ({ close, ...props }) => {
  const { game, startGamePlay } = useGame()

  const onClick = useCallback(() => {
    startGamePlay()
    close()
  }, [startGamePlay, close])

  return (
    <IntroScreen {...props}>
      <Align.Center>
        <Wrapper small>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          <VSpace />
          <Button onClick={onClick} importance="primary" color="accent">
            Start game
          </Button>
        </Wrapper>
      </Align.Center>
    </IntroScreen>
  )
}
