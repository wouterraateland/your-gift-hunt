import React from "react"
import useGame from "hooks/useGame"

import { Loader, FullHeight } from "your-gift-hunt/ui"
import UnauthenticatedPage from "pages/unauthenticated"
import PlayableGame from "./Playable"

const Game = () => {
  const { isLoading, isAuthenticated, game } = useGame()

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

export default Game
