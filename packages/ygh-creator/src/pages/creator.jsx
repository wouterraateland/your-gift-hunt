import React, { useContext, useRef } from "react"

import { EntitiesProvider } from "contexts/Entities"
import { GameProvider } from "contexts/Game"
import InspectorContext, { InspectorProvider } from "contexts/Inspector"

import useClickOutside from "hooks/useClickOutside"

import Layout from "layouts/Creator"

import EditorPane from "components/Editor/EditorPane"
import DetailPane from "components/Editor/DetailPane"
import Toolbox from "components/Editor/Toolbox"
import SettingsModal from "components/modals/Settings"

const Creator = () => {
  const detailPane = useRef(null)
  const { closeInspector } = useContext(InspectorContext)

  useClickOutside({
    ref: detailPane,
    onClickOutside: closeInspector
  })

  return (
    <Layout>
      <EditorPane />
      <Toolbox />
      <DetailPane ref={detailPane} />
    </Layout>
  )
}

const CreatorPage = ({ creatorSlug, gameSlug, ...otherProps }) => (
  <EntitiesProvider>
    <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
      <InspectorProvider>
        <Creator />
        {otherProps["*"] === "settings" && <SettingsModal />}
      </InspectorProvider>
    </GameProvider>
  </EntitiesProvider>
)

export default CreatorPage
