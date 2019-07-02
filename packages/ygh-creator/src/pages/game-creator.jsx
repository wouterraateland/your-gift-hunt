import React, { memo, useEffect, useRef } from "react"
import { navigate } from "@reach/router"

import { SaveStateProvider } from "contexts/SaveState"
import { GameTemplatesProvider } from "contexts/GameTemplates"
import { GameProvider } from "contexts/Game"
import { EntitiesProvider } from "contexts/Entities"
import { EntityFocusProvider } from "contexts/EntityFocus"
import { EntityGraphProvider } from "contexts/EntityGraph"
import { EntityAreasProvider } from "contexts/EntityAreas"
import { EntityPositionsProvider } from "contexts/EntityPositions"
import { EntityDependenciesProvider } from "contexts/EntityDependencies"
import { GameQueriesProvider } from "contexts/GameQueries"
import { GameMutationsProvider } from "contexts/GameMutations"
import { EditorProvider } from "contexts/Editor"
import { InspectorProvider } from "contexts/Inspector"

import useClickOutside from "hooks/useClickOutside"
import useGame from "hooks/useGame"
import useInspector from "hooks/useInspector"
import useEditor from "hooks/useEditor"

import useEntityPositionUpdates from "hooks/useEntityPositionUpdates"
import useEntityAreaUpdates from "hooks/useEntityAreaUpdates"

import Layout from "layouts/GameCreator"

import EditorPane from "components/GameCreator/EditorPane"
import GraphicPane from "components/GameCreator/GraphicPane"
import DetailPane from "components/GameCreator/DetailPane"
import Toolbox from "components/GameCreator/Toolbox"
import ViewSwitch from "components/GameCreator/ViewSwitch"

import SettingsModal from "components/modals/GameSettings"
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

const Creator = memo(() => {
  useEntityPositionUpdates()
  useEntityAreaUpdates()

  const { selectedView } = useEditor()
  return (
    <Layout>
      {selectedView === "logic" && <EditorPane />}
      {selectedView === "graphic" && <GraphicPane />}
      <Toolbox />
      <ViewSwitch />
      <ClosableDetailPane />
    </Layout>
  )
})

const CreatorWithModal = props => {
  const { gameExists } = useGame()

  useEffect(() => {
    if (!gameExists) {
      navigate("/")
    }
  }, [gameExists])

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
    <EntityFocusProvider>
      <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
        <GameTemplatesProvider>
          <EntitiesProvider>
            <EntityGraphProvider>
              <EntityAreasProvider>
                <EntityPositionsProvider>
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
                </EntityPositionsProvider>
              </EntityAreasProvider>
            </EntityGraphProvider>
          </EntitiesProvider>
        </GameTemplatesProvider>
      </GameProvider>
    </EntityFocusProvider>
  </SaveStateProvider>
)

export default CreatorPage
