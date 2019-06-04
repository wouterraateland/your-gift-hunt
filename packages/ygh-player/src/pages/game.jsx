import React from "react"

import { GameProvider } from "contexts/Game"
import { ViewportProvider } from "contexts/Viewport"
import { DragProvider } from "contexts/Drag"
import { ScreenProvider } from "contexts/Screen"
import { HintsProvider } from "contexts/Hints"

import Theme from "containers/Theme"

import Game from "components/Game"

const GamePage = ({ creatorSlug, gameSlug }) => (
  <Theme>
    <ViewportProvider>
      <DragProvider>
        <ScreenProvider>
          <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
            <HintsProvider>
              <Game />
            </HintsProvider>
          </GameProvider>
        </ScreenProvider>
      </DragProvider>
    </ViewportProvider>
  </Theme>
)

export default GamePage
