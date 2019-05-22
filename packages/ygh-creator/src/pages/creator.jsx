import React, { memo, useEffect, useRef } from "react"
import { navigate } from "@reach/router"

import { SaveStateProvider } from "contexts/SaveState"
import { TemplatesProvider } from "contexts/Templates"
import { GameProvider } from "contexts/Game"
import { EntitiesProvider } from "contexts/Entities"
import { EntityGraphProvider } from "contexts/EntityGraph"
import { EntityAreasProvider } from "contexts/EntityAreas"
import { EntityDependenciesProvider } from "contexts/EntityDependencies"
import { GameQueriesProvider } from "contexts/GameQueries"
import { GameMutationsProvider } from "contexts/GameMutations"
import { EditorProvider } from "contexts/Editor"
import { InspectorProvider } from "contexts/Inspector"

import useClickOutside from "hooks/useClickOutside"
import useGame from "hooks/useGame"
import useInspector from "hooks/useInspector"

import Layout from "layouts/Creator"

import EditorPane from "components/Editor/EditorPane"
import DetailPane from "components/Editor/DetailPane"
import Toolbox from "components/Editor/Toolbox"

import SettingsModal from "components/modals/Settings"
import PublishModal from "components/modals/Publish"
import PublishedModal from "components/modals/Published"

const ClosableDetailPane = () => {
  const detailPane = useRef(null)
  const { closeInspector } = useInspector()

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
  const { gameExists } = useGame()

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
      {props["*"] === "publish" && <PublishModal />}
      {props["*"] === "published" && <PublishedModal />}
    </>
  ) : null
}

const CreatorPage = ({ creatorSlug, gameSlug, ...otherProps }) => (
  <SaveStateProvider>
    <TemplatesProvider>
      <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
        <EntitiesProvider>
          <EntityGraphProvider>
            <EntityAreasProvider>
              <EntityDependenciesProvider>
                <GameQueriesProvider>
                  <GameMutationsProvider>
                    <EditorProvider>
                      <InspectorProvider>
                        <CreatorWithModal {...otherProps} />
                      </InspectorProvider>
                    </EditorProvider>
                  </GameMutationsProvider>
                </GameQueriesProvider>
              </EntityDependenciesProvider>
            </EntityAreasProvider>
          </EntityGraphProvider>
        </EntitiesProvider>
      </GameProvider>
    </TemplatesProvider>
  </SaveStateProvider>
)

export default CreatorPage
