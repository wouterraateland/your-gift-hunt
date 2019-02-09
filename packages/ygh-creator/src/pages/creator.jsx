import React from "react"
import { useQuery } from "react-apollo-hooks"
import { GAME_BY_SLUG } from "gql/queries"

import Layout from "layouts/Creator"

import EditorPane from "components/EditorPane"
import DetailPane from "components/DetailPane"

const creator = hunt => {
  return (
    <Layout hunt={hunt}>
      <EditorPane>
        {hunt.instances && hunt.instances.length} instances
      </EditorPane>
      <DetailPane />
    </Layout>
  )
}

const CreatorPage = ({ creatorSlug, gameSlug }) => {
  const { data, error } = useQuery(GAME_BY_SLUG, {
    variables: { creatorSlug, gameSlug }
  })

  return error
    ? `Error: ${error.message}`
    : data.games.length === 1
    ? creator(data.games[0])
    : null
}

export default CreatorPage
