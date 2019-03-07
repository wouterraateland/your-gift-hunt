import React, { Suspense, useContext, useState } from "react"
import slugify from "limax"

import AuthContext from "contexts/Auth"

import { useQuery } from "react-apollo-hooks"
import useDebounce from "hooks/useDebounce"

import { Link } from "@reach/router"
import { Wrapper, Paper, Float, Input, Button, Loader } from "your-gift-hunt/ui"
import Layout from "layouts/Overview"
import HuntList from "components/HuntList"

import { USER_GAMES } from "gql/queries"

const Overview = ({ searchQuery }) => {
  const { user } = useContext(AuthContext)
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
        <Paper>
          <Paper.Section>
            <Float.Left>
              <Input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search hunts"
              />
            </Float.Left>
            <Float.Right>
              <Button importance="primary" color="accent" as={Link} to="/new">
                New hunt
              </Button>
            </Float.Right>
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
