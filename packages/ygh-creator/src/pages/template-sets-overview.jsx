import React, { Suspense, useState } from "react"
import slugify from "limax"

import useAuth from "hooks/useAuth"

import { useQuery } from "react-apollo-hooks"
import { useDebounce } from "ygh-hooks"

import { Link } from "@reach/router"
import Icons from "ygh-icons"
import { Wrapper, Paper, Field, Button, Loader } from "ygh-ui"
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
              placeholder="Search template sets"
              block="small"
            />
            <Button
              style={{ float: "right" }}
              importance="primary"
              color="primary"
              as={Link}
              to="/new-template-set"
              block="small"
            >
              New set
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
