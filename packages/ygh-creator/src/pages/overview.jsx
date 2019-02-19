import React, { Suspense, useContext, useState } from "react"
import { Link } from "@reach/router"
import { useQuery } from "react-apollo-hooks"
import { CREATED_GAMES } from "gql/queries"

import AuthContext from "contexts/Auth"
import useDebounce from "hooks/useDebounce"

import { Wrapper, Paper, Float, Input, Button, Loader } from "your-gift-hunt/ui"
import Layout from "layouts/Overview"
import HuntList from "components/HuntList"

const Overview = ({ searchQuery }) => {
  const { user } = useContext(AuthContext)
  const { data, error } = useQuery(CREATED_GAMES, {
    variables: {
      creatorId: user.user_metadata.prismaUserId,
      slugPrefix: searchQuery.replace(/ /g, "-").toLowerCase()
    }
  })

  return <HuntList hunts={data.games} error={error} />
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
