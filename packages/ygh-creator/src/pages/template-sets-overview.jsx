import React, { Suspense, useState } from "react"
import slugify from "limax"

import useAuth from "hooks/useAuth"

import { useQuery } from "react-apollo-hooks"
import { useDebounce } from "ygh-hooks"

import { Link } from "@reach/router"
import { Wrapper, Paper, Input, Button, Loader } from "ygh-ui"
import Layout from "layouts/Overview"
import TemplateSetsOverview from "components/TemplateSetsOverview"

import { USER_TEMPLATE_SETS } from "gql/queries"

const Overview = ({ user, searchQuery }) => {
  const { data, error } = useQuery(USER_TEMPLATE_SETS, {
    variables: {
      userId: user.id
    }
  })

  return (
    <TemplateSetsOverview
      templateSets={data.user.entityTemplateSetsCreated.filter(({ name }) =>
        slugify(name).startsWith(slugify(searchQuery))
      )}
      error={error}
    />
  )
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
      <Wrapper>
        <Paper fullWidthOnMobile>
          <Paper.Section>
            <Input
              style={{ float: "left" }}
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search template sets"
              block="small"
            />
            <Button
              style={{ float: "right" }}
              importance="primary"
              color="primary"
              as={Link}
              to={`/${user.username}/new-template-set`}
              block="small"
            >
              New set
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
