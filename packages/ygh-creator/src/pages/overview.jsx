import React, { Suspense, useState } from "react"
import slugify from "limax"

import useAuth from "hooks/useAuth"

import { useQuery } from "react-apollo-hooks"
import useDebounce from "hooks/useDebounce"

import { Link } from "@reach/router"
import { Wrapper, Paper, Input, Button, Loader } from "your-gift-hunt/ui"
import Layout from "layouts/Overview"
import HuntList from "components/HuntList"

import { USER_GAMES } from "gql/queries"

const Overview = ({ searchQuery }) => {
  const { user } = useAuth()
  const { data, error } = useQuery(USER_GAMES, {
    variables: {
      userId: user.user_metadata.prismaUserId,
      slugPrefix: slugify(searchQuery)
    }
  })

  return <HuntList hunts={data.user.games} error={error} />
}

const OverviewPage = () => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  return (
    <Layout title="Creator">
      <Wrapper>
        <Paper fullWidthOnMobile>
          <Paper.Section>
            <Input
              style={{ float: "left" }}
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search hunts"
              block="small"
            />
            <Button
              style={{ float: "right" }}
              importance="primary"
              color="accent"
              as={Link}
              to="/new"
              block="small"
            >
              New hunt
            </Button>
          </Paper.Section>
          <Suspense fallback={<Loader />}>
            <Overview searchQuery={debouncedQuery} />
          </Suspense>
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default OverviewPage
