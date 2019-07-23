import React, { memo, useEffect } from "react"
import { navigate } from "@reach/router"

import { PanZoomEditorProvider } from "contexts/PanZoomEditor"
import { PanZoomGraphicProvider } from "contexts/PanZoomGraphic"
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

import useGame from "hooks/useGame"
import useEditor from "hooks/useEditor"

import useEntityPositionUpdates from "hooks/useEntityPositionUpdates"
import useEntityAreaUpdates from "hooks/useEntityAreaUpdates"

import Layout from "layouts/GameCreator"
import { SplitPane } from "ygh-ui"

import EntityExplorer from "components/GameCreator/EntityExplorer"
import EditorPane from "components/GameCreator/EditorPane"
import GraphicPane from "components/GameCreator/GraphicPane"
import DetailPane from "components/GameCreator/DetailPane"
import Toolbox from "components/GameCreator/Toolbox"
import ActionBar from "../components/GameCreator/ActionBar"
import ViewSwitch from "components/GameCreator/ViewSwitch"

import SettingsModal from "components/modals/GameSettings"
import PublishModal from "components/modals/Publish"
import PublishedModal from "components/modals/Published"

const InfoSwitch = ({ selectedPane }) => {
  return null
}

const MainPane = memo(() => {
  useEntityPositionUpdates()
  useEntityAreaUpdates()

  const { selectedView } = useEditor()
  return (
    <>
      {selectedView === "logic" && <EditorPane />}
      {selectedView === "graphic" && (
        <>
          <GraphicPane />
          <ActionBar />
        </>
      )}
      <Toolbox />
      <ViewSwitch />
    </>
  )
})

const getInfoComponent = (selectedPane, INFO_TYPES) => {
  switch (selectedPane) {
    case INFO_TYPES.INFO:
      return SettingsModal
    case INFO_TYPES.EXPLORE:
    default:
      return EntityExplorer
  }
}

const getActionComponent = (upcomingAction, ACTION_TYPES) => {
  switch (upcomingAction) {
    case ACTION_TYPES.PUBLISH_GAME:
      return PublishModal
    case ACTION_TYPES.SHARE_GAME:
      return PublishedModal
    default:
      return DetailPane
  }
}

const Creator = () => {
  const { selectedPane, upcomingAction, INFO_TYPES, ACTION_TYPES } = useEditor()

  const InfoComponent = getInfoComponent(selectedPane, INFO_TYPES)
  const ActionComponent = getActionComponent(upcomingAction, ACTION_TYPES)

  return (
    <Layout>
      <SplitPane split="vertical">
        <SplitPane.Pane minSize={48} maxSize={48} initialSize={48}>
          <InfoSwitch selectedPane={selectedPane} />
        </SplitPane.Pane>
        {InfoComponent && (
          <SplitPane.Pane initialSize={256}>
            <InfoComponent />
          </SplitPane.Pane>
        )}
        <SplitPane.Pane>
          <MainPane />
        </SplitPane.Pane>
        {ActionComponent && (
          <SplitPane.Pane initialSize={256} maxSize={384}>
            <ActionComponent />
          </SplitPane.Pane>
        )}
      </SplitPane>
    </Layout>
  )
}

const CreatorWithModal = () => {
  const { gameExists } = useGame()

  useEffect(() => {
    if (!gameExists) {
      navigate("/")
    }
  }, [gameExists])

  return gameExists ? <Creator /> : null
}

const CreatorPage = ({ creatorSlug, gameSlug }) => (
  <PanZoomEditorProvider>
    <PanZoomGraphicProvider>
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
                                <CreatorWithModal />
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
    </PanZoomGraphicProvider>
  </PanZoomEditorProvider>
)

export default CreatorPage
