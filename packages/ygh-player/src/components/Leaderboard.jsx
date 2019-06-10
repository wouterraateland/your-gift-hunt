import React, { useCallback, useEffect, useState } from "react"

import useAsync from "hooks/useAsync"
import { useYGHPlayerContext } from "ygh-player/react-hook"

import { Loader } from "your-gift-hunt/ui"

const Leaderboard = ({ game }) => {
  const [{ isLoading }, runAsync] = useAsync()
  const [leaderboard, setLeaderboard] = useState(null)
  const { getLeaderboard } = useYGHPlayerContext()

  const loadLeaderboard = useCallback(
    runAsync(async gameId => {
      const leaderboard = await getLeaderboard({ gameId })
      setLeaderboard(leaderboard)
    }),
    []
  )

  useEffect(() => {
    loadLeaderboard(game.id)
  }, [game.id])

  return isLoading ? <Loader /> : JSON.stringify(leaderboard)
}

export default Leaderboard
