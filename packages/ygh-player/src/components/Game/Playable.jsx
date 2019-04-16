import React from "react"
import styled from "styled-components"

import Viewport from "components/Viewport"
import Sidebar from "components/Sidebar"
import ScreenContainer from "components/ScreenContainer"
import DragImage from "components/DragImage"

import DefaultScene from "components/scenes/default"

const GamePage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(100 * var(--vh));

  @media (orientation: landscape) {
    flex-direction: row-reverse;
  }
`

const PlayableGame = () => (
  <GamePage>
    <Viewport>
      <DefaultScene />
    </Viewport>
    <ScreenContainer />
    <Sidebar />
    <DragImage />
  </GamePage>
)

export default PlayableGame
