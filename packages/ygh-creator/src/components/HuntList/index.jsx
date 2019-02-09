import React from "react"

import HuntThumb from "./Thumb"
import EmptyHuntList from "./Empty"

const HuntList = ({ hunts: games }) => {
  return games.length ? (
    games.map((game, i) => <HuntThumb key={i} game={game} />)
  ) : (
    <EmptyHuntList />
  )
}

export default HuntList
