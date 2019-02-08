import React from "react"

import Layout from "layouts/Creator"

import EditorPane from "components/EditorPane"
import DetailPane from "components/DetailPane"

const creator = hunt => {
  return (
    <Layout hunt={hunt}>
      <EditorPane>
        {hunt.triggers && hunt.triggers.length} triggers
        <br />
        {hunt.entities && hunt.entities.length} entities
        <br />
        {hunt.nodes && hunt.nodes.length} nodes
      </EditorPane>
      <DetailPane />
    </Layout>
  )
}

const CreatorPage = ({ slug }) => {
  const hunts = []

  return hunts && hunts.length ? creator(hunts[0]) : null
}

export default CreatorPage
