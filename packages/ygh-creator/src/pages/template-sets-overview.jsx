import React, { Suspense, useCallback, useState } from "react"
import slugify from "limax"

import useAuth from "hooks/useAuth"

import { useQuery, useMutation } from "react-apollo-hooks"
import { useAsync, useDebounce } from "ygh-hooks"

import { navigate } from "@reach/router"
import { Wrapper, Paper, Field, Button, Loader } from "ygh-ui"
import Layout from "layouts/Overview"
import TemplateSetsOverview from "components/TemplateSetsOverview"

import { USER_TEMPLATE_SETS } from "gql/queries"
import { CREATE_TEMPLATE_SET } from "gql/mutations"

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

  const createEntityTemplateSet = useMutation(CREATE_TEMPLATE_SET)

  const [{ isLoading }, runAsync] = useAsync()

  const createTemplateSet = useCallback(
    runAsync(async event => {
      event.preventDefault()

      const { data } = await createEntityTemplateSet({
        variables: {
          values: {
            name: "Nameless",
            description: "",
            creator: { connect: { id: user.id } }
          }
        },
        update: (proxy, { data: { createEntityTemplateSet } }) => {
          const query = {
            query: USER_TEMPLATE_SETS,
            variables: { userId: user.id }
          }
          const data = proxy.readQuery(query)
          data.user.entityTemplateSetsCreated.push(createEntityTemplateSet)

          proxy.writeQuery({ ...query, data })
        }
      })

      navigate(`/edit-template-set/${data.createEntityTemplateSet.id}`)
    }),
    [user]
  )

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
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search template sets"
              block="small"
            />
            <Button
              disabled={isLoading}
              style={{ float: "right" }}
              importance="primary"
              color="primary"
              onClick={createTemplateSet}
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
