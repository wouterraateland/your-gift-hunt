import React, { Suspense, useState } from "react"
import slugify from "limax"

import useUser from "hooks/useUser"

import { useQuery } from "react-apollo-hooks"
import useDebounce from "hooks/useDebounce"

import { Link } from "@reach/router"
import { Wrapper, Paper, Input, Button, Loader } from "your-gift-hunt/ui"
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
  const { user } = useUser()
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  return (
    <Layout
      title="Creator"
      items={[
        {
          label: "Games",
          to: `/${user.slug}/games`
        },
        {
          label: "Template sets",
          to: `/${user.slug}/template-sets`
        }
      ]}
    >
      <Wrapper>
        <Paper fullWidthOnMobile>
          <Paper.Section>
            <Input
              style={{ float: "left" }}
              type="search"
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
              to={`/${user.slug}/new-game`}
              block="small"
            >
              New game
            </Button>
          </Paper.Section>
          <Suspense fallback={<Loader />}>
            <Overview searchQuery={debouncedQuery} user={user} />
          </Suspense>
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default OverviewPage
