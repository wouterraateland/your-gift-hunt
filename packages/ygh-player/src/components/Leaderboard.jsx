import React, { useCallback, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { Link } from "@reach/router"
import moment from "moment"

import useAsync from "hooks/useAsync"
import { useYGHPlayerContext } from "ygh-player/react-hook"

import { Loader } from "your-gift-hunt/ui"

const Entry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Avatar = styled.div.attrs(({ avatar }) => ({
  style: {
    backgroundImage: `url(${avatar})`
  }
}))`
  width: 2em;
  height: 2em;
  margin: 0.5em 1em;
  border-radius: 100%;

  background: #0009 no-repeat center / cover;
`

const PositionIndicator = styled.strong`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  padding: .25em;
  border-radius: 100%;

  line-height: 1;
  text-align: center;

  ${props =>
    props.position === 1 &&
    css`
      background-color: gold;
    `}
  ${props =>
    props.position === 2 &&
    css`
      background-color: silver;
    `}
  ${props =>
    props.position === 3 &&
    css`
      background-color: sandybrown;
    `}
`

const Duration = styled.strong`
  display: inline-block;
  width: 5em;
  margin-left: auto;
`

const padd = x => x.toString(10).padStart(2, "0")

const LeaderboardEntry = ({ netDuration, position, player, isYours }) => {
  const duration = moment.duration(netDuration)
  return (
    <Entry>
      <PositionIndicator position={position}>
        {position ? position : "You"}
      </PositionIndicator>
      <Avatar avatar={player.avatar} />
      <Link to={`/${player.username}`}>
        {player.name}
        {isYours && position && ` (You)`}
      </Link>
      <Duration>
        {duration.hours()}:{padd(duration.minutes())}:{padd(duration.seconds())}
      </Duration>
    </Entry>
  )
}

const RankedPlays = ({ plays }) =>
  plays.map(play => <LeaderboardEntry key={play.id} {...play} />)

const ActiveLeaderboard = ({ rankedPlays, yourBestPlay }) => {
  const containsYours =
    yourBestPlay &&
    rankedPlays.some(play => play.player.id === yourBestPlay.player.id)

  return (
    <>
      <Entry>
        <span style={{ width: "1.5em", textAlign: "center" }}>#</span>
        <span style={{ margin: "0 1em" }}>Player</span>
        <span style={{ width: "5em", marginLeft: "auto" }}>Time</span>
      </Entry>
      <RankedPlays
        plays={rankedPlays.map((play, i) => ({
          ...play,
          position: i + 1,
          isYours: yourBestPlay && yourBestPlay.player.id === play.player.id
        }))}
      />
      {yourBestPlay && !containsYours && (
        <LeaderboardEntry isYours {...yourBestPlay} />
      )}
    </>
  )
}

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

  return isLoading ? (
    <Loader />
  ) : (
    leaderboard && <ActiveLeaderboard {...leaderboard} />
  )
}

export default Leaderboard
