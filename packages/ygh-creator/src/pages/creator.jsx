import React, { useState, useRef } from "react"
import { useQuery } from "react-apollo-hooks"
import { GAME_BY_SLUG } from "gql/queries"

import useClickOutside from "hooks/useClickOutside"

import Layout from "layouts/Creator"

import EditorPane from "containers/EditorPane"
import DetailPane from "containers/DetailPane"

const creator = hunt => {
  const detailPane = useRef(null)
  const [selectedInstance, selectInstance] = useState(null)
  const [detailsVisibility, setDetailsVisibility] = useState(false)

  useClickOutside({
    ref: detailPane,
    onClickOutside: () => setDetailsVisibility(false)
  })

  return (
    <Layout hunt={hunt}>
      <EditorPane
        hunt={hunt}
        onCardClick={id => {
          selectInstance(id)
          setDetailsVisibility(true)
        }}
      />
      <DetailPane
        ref={detailPane}
        open={detailsVisibility}
        selectedInstance={hunt.instances.find(
          ({ id }) => id === selectedInstance
        )}
      />
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
