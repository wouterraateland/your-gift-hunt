import React, { Suspense, useState } from "react"
import slugify from "limax"

import useAuth from "hooks/useAuth"

import { useQuery } from "react-apollo-hooks"
import { useDebounce } from "ygh-hooks"

import { Link } from "@reach/router"
import { Wrapper, Paper, Field, Button, Loader } from "ygh-ui"
import Icons from "ygh-icons"

import Layout from "layouts/Overview"
import GamesOverview from "components/GamesOverview"

import { USER_GAMES } from "gql/queries"

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

  return (
    <Layout
      title="Creator"
      items={[
        {
          label: "Games",
          to: `/${user.username}/games`
        },
        {
          label: "Template sets",
          to: `/${user.username}/template-sets`
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
              as={Link}
              to={`/${user.username}/new-game`}
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
