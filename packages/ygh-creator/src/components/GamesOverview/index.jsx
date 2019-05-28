import React from "react"

import Game from "./Game"
import EmptyGamesOverview from "./Empty"

const GamesOverview = ({ games }) => {
  return games.length ? (
    games.map((game, i) => <Game key={i} game={game} />)
  ) : (
    <EmptyGamesOverview />
  )
}

export default GamesOverview
