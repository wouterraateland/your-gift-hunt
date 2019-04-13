import React from "react"
import styled from "styled-components"

import { DragProvider } from "contexts/Drag"
import { ScreenProvider } from "contexts/Screen"

import Viewport from "components/Viewport"
import Sidebar from "components/Sidebar"
import ScreenContainer from "components/ScreenContainer"
import DragImage from "components/DragImage"

import DefaultScene from "components/scenes/default"

const GamePage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (orientation: landscape) {
    flex-direction: row-reverse;
  }
`

const PlayableGame = () => (
  <DragProvider>
    <ScreenProvider>
      <GamePage>
        <Viewport>
          <DefaultScene />
        </Viewport>
        <Sidebar />
        <ScreenContainer />
        <DragImage />
      </GamePage>
    </ScreenProvider>
  </DragProvider>
)

export default PlayableGame
