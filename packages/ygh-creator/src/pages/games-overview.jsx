import { PRIVACY, ACCESS_TYPES } from "data"
import React, { Suspense, useCallback, useState } from "react"
import slugify from "limax"
import randomString from "randomstring"

import { useMutation } from "react-apollo-hooks"
import useAuth from "hooks/useAuth"

import { useQuery } from "react-apollo-hooks"
import { useDebounce } from "ygh-hooks"

import { navigate } from "@reach/router"
import { Wrapper, Paper, Field, Button, Loader } from "ygh-ui"
import Icons from "ygh-icons"

import Layout from "layouts/Overview"
import GamesOverview from "components/GamesOverview"

import { USER_GAMES } from "gql/queries"
import { CREATE_GAME } from "gql/mutations"

const Overview = ({ searchQuery, user }) => {
  const { data, error } = useQuery(USER_GAMES, {
    variables: {
      userId: user.id,
      slugPrefix: slugify(searchQuery)
    }
  })

  return <GamesOverview games={data.user.games} error={error} />
}

const OverviewPage = () => {
  const { user } = useAuth()
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  const createGameMutation = useMutation(CREATE_GAME)

  const createGame = useCallback(async () => {
    const {
      data: {
        createGame: { id }
      }
    } = await createGameMutation({
      variables: {
        name: "Nameless",
        slug: randomString.generate(10),
        description: "",
        creatorId: user.id,
        privacy: PRIVACY.PUBLIC,
        accessType: ACCESS_TYPES.NONE,
        accessCode: ""
      },
      refetchQueries: [
        {
          query: USER_GAMES,
          variables: { userId: user.id, slugPrefix: "" }
        }
      ]
    })

    navigate(`/edit/${id}`)
  }, [])

  return (
    <Layout
      title="Creator"
      items={[
        {
          label: "Games",
          to: `/my-games`
        },
        {
          label: "Template sets",
          to: `/my-template-sets`
        }
      ]}
    >
      <Wrapper.Medium>
        <Paper fullWidthOnMobile>
          <Paper.Section>
            <Field
              style={{ float: "left" }}
              type="search"
              lead={<Icons.Loop />}
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search games"
              block="small"
            />
            <Button
              style={{ float: "right" }}
              importance="primary"
              color="primary"
              onClick={createGame}
              block="small"
            >
              New game
            </Button>
          </Paper.Section>
          <Suspense fallback={<Loader />}>
            <Overview searchQuery={debouncedQuery} user={user} />
          </Suspense>
        </Paper>
      </Wrapper.Medium>
    </Layout>
  )
}

export default OverviewPage
