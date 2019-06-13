import React, { useEffect, useMemo, useState } from "react"

import { useYGHPlayerContext } from "ygh-player/react-hook"

import {
  Align,
  Column,
  Input,
  Loader,
  Message,
  Row,
  VSpace,
  Wrapper
} from "your-gift-hunt/ui"
import { MailchimpForm } from "your-gift-hunt/components"
import Layout from "layouts/Page"
import GameThumb from "components/GameThumb"

const ActiveIndexPage = ({ games, gamePlays, user }) => {
  const [type, setType] = useState("public")

  const gameFilters = useMemo(
    () => ({
      public: game => game.privacy === "PUBLIC",
      progress: game => game.progress !== null && game.progress !== 1,
      completed: game => game.progress === 1
    }),
    [gamePlays]
  )

  const visibleGames = useMemo(() => games.filter(gameFilters[type]), [
    type,
    games,
    gamePlays
  ])

  return (
    <Layout>
      <Wrapper>
        <VSpace.Large />
        <Align.Center>
          <h1>Games made by the community, for everyone.</h1>
          <Input
            type="select"
            format="horizontal"
            value={type}
            onChange={event => setType(event.target.value)}
            options={[
              { label: "Public games", value: "public" },
              { label: "Gameplay in progress", value: "progress" },
              { label: "Completed games", value: "completed" }
            ]}
          />
        </Align.Center>
        <VSpace.Large />
        <Row>
          {visibleGames.map(game => (
            <Column key={game.id} size={4} mSize={6}>
              <GameThumb game={game} />
            </Column>
          ))}
        </Row>
        <Align.Center>
          <h2>Subscribe for Beta access</h2>
          <p>And be the first to create your own unique puzzle games</p>
          <MailchimpForm />
        </Align.Center>
      </Wrapper>
    </Layout>
  )
}

const IndexPage = () => {
  const [games, setGames] = useState([])
  const { isLoading, error, listGames, gamePlays, user } = useYGHPlayerContext()

  useEffect(() => {
    listGames().then(setGames)
  }, [])

  return error ? (
    <Layout>
      <Message.Error>
        Something went wrong, please reload. (${error.message})
      </Message.Error>
    </Layout>
  ) : isLoading ? (
    <Layout>
      <Loader />
    </Layout>
  ) : (
    <ActiveIndexPage games={games} gamePlays={gamePlays} user={user} />
  )
}

export default IndexPage
