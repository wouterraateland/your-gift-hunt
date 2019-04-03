import React from "react"

import { DragProvider } from "contexts/Drag"
import { GameProvider } from "contexts/Game"
import { ScreenProvider } from "contexts/Screen"

import Game from "components/Game"

const GamePage = ({ creatorSlug, gameSlug }) => (
  <DragProvider>
    <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
      <ScreenProvider>
        <Game />
      </ScreenProvider>
    </GameProvider>
  </DragProvider>
)

export default GamePage
