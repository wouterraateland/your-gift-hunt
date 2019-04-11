import React, { useContext } from "react"

import { DragProvider } from "contexts/Drag"
import GameContext, { GameProvider } from "contexts/Game"
import { ScreenProvider } from "contexts/Screen"

import Theme from "containers/Theme"

import { Loader, FullHeight } from "your-gift-hunt/ui"
import Game from "components/Game"
import UnauthenticatedPage from "./unauthenticated"

const PlayableGame = () => (
  <DragProvider>
    <ScreenProvider>
      <Game />
    </ScreenProvider>
  </DragProvider>
)

const GamePageInner = () => {
  const { isLoading, isAuthenticated, game } = useContext(GameContext)

  return isAuthenticated && !isLoading ? (
    <PlayableGame />
  ) : game && game.privacy === "PRIVACY" && !isAuthenticated ? (
    <UnauthenticatedPage />
  ) : (
    <FullHeight>
      <Loader />
    </FullHeight>
  )
}

const GamePage = ({ creatorSlug, gameSlug }) => (
  <Theme>
    <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
      <GamePageInner />
    </GameProvider>
  </Theme>
)

export default GamePage
