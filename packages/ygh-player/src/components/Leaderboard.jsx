import React from "react"
import styled, { css } from "styled-components"
import { Link } from "@reach/router"
import moment from "moment"

import { useQuery } from "ygh-hooks"
import { useYGHPlayerContext } from "ygh-sdk"
import { Loader } from "ygh-ui"

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

  flex-shrink: 0;

  background: #0009 no-repeat center / cover;
`

const PositionIndicator = styled.strong`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  padding: .25em;
  border-radius: 100%;

  flex-shrink: 0;

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

const EmptyLeaderboard = styled.div`
  padding: 1em;
  margin-top: 1em;
  border-radius: ${props => props.theme.borderRadius};

  text-align: center;

  background-color: #0001;
`

const padd = x => x.toString(10).padStart(2, "0")

const LeaderboardEntry = ({ netDuration, position, player, isYours }) => {
  const duration = moment.duration(netDuration)
  return (
    <Entry>
      <PositionIndicator position={position}>
        {position ? position : "You"}
      </PositionIndicator>
      <Avatar avatar={player ? player.avatar : null} />
      {player ? (
        <Link to={`/user/${player.id}`}>
          {player.name}
          {isYours && position && ` (You)`}
        </Link>
      ) : (
        <em>Anonymous</em>
      )}
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
    rankedPlays.some(
      play => play.player && play.player.id === yourBestPlay.player.id
    )

  return rankedPlays.length ? (
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
          isYours:
            yourBestPlay &&
            play.player &&
            yourBestPlay.player.id === play.player.id
        }))}
      />
      {yourBestPlay && !containsYours && (
        <LeaderboardEntry isYours {...yourBestPlay} />
      )}
    </>
  ) : (
    <EmptyLeaderboard>No scores for this room yet.</EmptyLeaderboard>
  )
}

const Leaderboard = ({ game }) => {
  const { getLeaderboard } = useYGHPlayerContext()
  const [{ data: leaderboard, isLoading }] = useQuery(() =>
    getLeaderboard({ gameId: game.id })
  )

  return isLoading ? (
    <Loader />
  ) : (
    leaderboard && <ActiveLeaderboard {...leaderboard} />
  )
}

export default Leaderboard
