import React, { useState, useRef } from "react"

import { GameProvider } from "contexts/Game"

import useClickOutside from "hooks/useClickOutside"

import Layout from "layouts/Creator"

import EditorPane from "components/Editor/EditorPane"
import DetailPane from "components/Editor/DetailPane"
import SettingsModal from "components/modals/Settings"

const Creator = () => {
  const detailPane = useRef(null)
  const [selectedNodeId, selectNode] = useState(null)
  const [detailsVisibility, setDetailsVisibility] = useState(false)

  useClickOutside({
    ref: detailPane,
    onClickOutside: () => setDetailsVisibility(false)
  })

  return (
    <Layout>
      <EditorPane
        onNodeClick={id => {
          selectNode(id)
          setDetailsVisibility(true)
        }}
      />
      <DetailPane
        ref={detailPane}
        open={detailsVisibility}
        nodeId={selectedNodeId}
      />
    </Layout>
  )
}

const CreatorPage = ({ creatorSlug, gameSlug, ...otherProps }) => (
  <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
    <Creator />
    {otherProps["*"] === "settings" && <SettingsModal />}
  </GameProvider>
)

export default CreatorPage
