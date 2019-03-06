import React, { useContext, useEffect, useRef } from "react"
import { navigate } from "@reach/router"

import { EntitiesProvider } from "contexts/Entities"
import GameContext, { GameProvider } from "contexts/Game"
import InspectorContext, { InspectorProvider } from "contexts/Inspector"
import { EditorProvider } from "contexts/Editor"

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
