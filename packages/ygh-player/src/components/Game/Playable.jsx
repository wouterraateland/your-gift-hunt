import React from "react"
import styled, { createGlobalStyle } from "styled-components"

import Viewport from "components/Viewport"
import Sidebar from "components/Sidebar"
import ScreenContainer from "components/ScreenContainer"
import DragImage from "components/DragImage"
import Hints from "components/Hints"

import DefaultScene from "components/scenes/default"

const GlobalGameStyle = createGlobalStyle`
body {
  overflow: hidden;
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
}
`

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
    <GlobalGameStyle />
    <Viewport>
      <DefaultScene />
    </Viewport>
    <ScreenContainer />
    <Sidebar />
    <DragImage />
    <Hints />
  </GamePage>
)

export default PlayableGame
