import React, { memo, useContext, useEffect, useRef } from "react"
import { navigate } from "@reach/router"

import { EntitiesProvider } from "contexts/Templates"
import GameContext, { GameProvider } from "contexts/Game"
import InspectorContext, { InspectorProvider } from "contexts/Inspector"
import { EditorProvider } from "contexts/Editor"

import useClickOutside from "hooks/useClickOutside"

import Layout from "layouts/Creator"

import EditorPane from "components/Editor/EditorPane"
import DetailPane from "components/Editor/DetailPane"
import Toolbox from "components/Editor/Toolbox"
import SettingsModal from "components/modals/Settings"

const ClosableDetailPane = () => {
  const detailPane = useRef(null)
  const { closeInspector } = useContext(InspectorContext)

  useClickOutside({
    ref: detailPane,
    onClickOutside: closeInspector
  })

  return <DetailPane ref={detailPane} />
}

const Creator = memo(() => (
  <Layout>
    <EditorPane />
    <Toolbox />
    <ClosableDetailPane />
  </Layout>
))

const CreatorWithModal = props => {
  const { gameExists } = useContext(GameContext)

  useEffect(
    () => {
      if (!gameExists) {
        navigate("/")
      }
    },
    [gameExists]
  )

  return gameExists ? (
    <>
      <Creator />
      {props["*"] === "settings" && <SettingsModal />}
    </>
  ) : null
}

const CreatorPage = ({ creatorSlug, gameSlug, ...otherProps }) => (
  <EntitiesProvider>
    <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
      <EditorProvider>
        <InspectorProvider>
          <CreatorWithModal {...otherProps} />
        </InspectorProvider>
      </EditorProvider>
    </GameProvider>
  </EntitiesProvider>
)

export default CreatorPage
