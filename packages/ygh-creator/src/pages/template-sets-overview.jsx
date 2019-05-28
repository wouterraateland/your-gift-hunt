import React, { Suspense, useState } from "react"
import slugify from "limax"

import useUser from "hooks/useUser"

import { useQuery } from "react-apollo-hooks"
import useDebounce from "hooks/useDebounce"

import { Link } from "@reach/router"
import { Wrapper, Paper, Input, Button, Loader } from "your-gift-hunt/ui"
import Layout from "layouts/Overview"
import TemplateSetsOverview from "components/TemplateSetsOverview"

import { USER_ENTITY_TEMPLATE_SETS } from "gql/queries"

const Overview = ({ user, searchQuery }) => {
  const { data, error } = useQuery(USER_ENTITY_TEMPLATE_SETS, {
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
              placeholder="Search template sets"
              block="small"
            />
            <Button
              style={{ float: "right" }}
              importance="primary"
              color="primary"
              as={Link}
              to={`/${user.slug}/new-template-set`}
              block="small"
              disabled
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
