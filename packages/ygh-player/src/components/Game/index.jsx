import React from "react"

import useGame from "hooks/useGame"

import { Loader, FullHeight } from "your-gift-hunt/ui"

import UnauthenticatedPage from "pages/unauthenticated"
import NotFoundPage from "pages/404"

import PlayableGame from "./Playable"

const Game = () => {
  const { isLoading, isAuthenticated, game, error } = useGame()

  if (error) {
    console.error(error)
  }

  return error ? (
    <NotFoundPage />
  ) : isAuthenticated && !isLoading ? (
    <PlayableGame />
  ) : game && game.privacy !== "PUBLIC" && !isAuthenticated ? (
    <UnauthenticatedPage />
  ) : (
    <FullHeight>
      <Loader />
    </FullHeight>
  )
}

export default Game
