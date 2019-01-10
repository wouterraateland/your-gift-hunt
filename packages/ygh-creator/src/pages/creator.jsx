import React from 'react'

import useFirestoreListener from 'hooks/useFirestoreListener'

import Layout from 'layouts/Creator'

import EditorPane from 'components/EditorPane'
import DetailPane from 'components/DetailPane'

const creator = (hunt) => {
  useFirestoreListener(`/hunts/${hunt.id}/nodes`)
  useFirestoreListener(`/hunts/${hunt.id}/triggers`)
  useFirestoreListener(`/hunts/${hunt.id}/entities`)

  return (
    <Layout hunt={hunt}>
      <EditorPane>
        {hunt.triggers && hunt.triggers.length} triggers<br />
        {hunt.entities && hunt.entities.length} entities<br />
        {hunt.nodes && hunt.nodes.length} nodes
      </EditorPane>
      <DetailPane>

      </DetailPane>
    </Layout>
  )
}

const CreatorPage = ({ slug }) => {
  const hunts = useFirestoreListener({
    collection: 'hunts',
    where: ['slug', '==', slug],
  }, 'hunts')

  return (hunts && hunts.length ? creator(hunts[0]) : null)
}

export default CreatorPage
