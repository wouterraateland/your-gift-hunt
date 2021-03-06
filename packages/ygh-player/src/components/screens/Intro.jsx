import React, { useCallback } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"

import Base from "./Base"
import { Align, Button, Paper, VSpace, Wrapper } from "ygh-ui"

const IntroScreen = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Wrapper.Tiny>
          <Paper>
            <Paper.Section>
              <h1>{game.name}</h1>
              <p>{game.description}</p>
            </Paper.Section>
          </Paper>
          <VSpace.Small />
          <Button onClick={onClick} importance="primary" color="primary">
            Start game
          </Button>
        </Wrapper.Tiny>
      </Align.Center>
    </IntroScreen>
  )
}
