import React, { useEffect, useMemo, useState } from "react"
import Helmet from "react-helmet"

import { useYGHPlayerContext } from "ygh-sdk"

import {
  Align,
  Column,
  Field,
  Loader,
  Message,
  Row,
  TabOptions,
  VSpace,
  Wrapper
} from "ygh-ui"
import Layout from "layouts/Page"
import GameThumb from "components/GameThumb"
import MailchimpForm from "components/MailchimpForm"

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
      <Helmet>
        <title>Showcase | Your Gift Hunt</title>
        <meta
          name="description"
          content="Create unique and personal escape games for each other."
        />

        <meta property="og:url" content="https://yourgifthunt.com" />
        <meta property="og:title" content="Your Gift Hunt" />
        <meta
          property="og:description"
          content="Make your gift a unique adventure with a personal scavenger gift hunt."
        />
        <meta
          property="og:image"
          content="https://play.yourgifthunt.com/og-image.png"
        />
        <meta property="fb:app_id" content="314877482688772" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="YourGiftHunt" />
        <meta name="twitter:title" content="Your Gift Hunt" />
        <meta
          name="twitter:description"
          content="Make your gift a unique adventure with a personal scavenger gift hunt."
        />
        <meta
          name="twitter:image"
          content="https://play.yourgifthunt.com/og-image.png"
        />
      </Helmet>
      <Wrapper.Medium>
        <VSpace.Large />
        <Align.Center>
          <h1>Highlighted escape rooms, created by the community.</h1>
          <Field
            type="select"
            component={TabOptions}
            value={type}
            onChange={event => setType(event.target.value)}
            options={[
              { label: "All games", value: "public" },
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
          <p>And be the first to create your own escape room games</p>
          <MailchimpForm />
        </Align.Center>
      </Wrapper.Medium>
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
