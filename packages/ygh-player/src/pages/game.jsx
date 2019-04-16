import React from "react"

import { GameProvider } from "contexts/Game"
import { DragProvider } from "contexts/Drag"
import { ScreenProvider } from "contexts/Screen"
import Theme from "containers/Theme"

import Game from "components/Game"

const GamePage = ({ creatorSlug, gameSlug }) => (
  <Theme>
    <DragProvider>
      <ScreenProvider>
        <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
          <Game />
        </GameProvider>
      </ScreenProvider>
    </DragProvider>
  </Theme>
)

export default GamePage
