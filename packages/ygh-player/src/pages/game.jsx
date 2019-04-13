import React from "react"

import { GameProvider } from "contexts/Game"
import Theme from "containers/Theme"

import Game from "components/Game"

const GamePage = ({ creatorSlug, gameSlug }) => (
  <Theme>
    <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
      <Game />
    </GameProvider>
  </Theme>
)

export default GamePage
