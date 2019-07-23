import React, { useEffect } from "react"
import { navigate } from "@reach/router"

import useGame from "hooks/useGame"
import useEditor from "hooks/useEditor"
import useInspector from "hooks/useInspector"

import Layout from "layouts/GameCreator"
import { SplitPane } from "ygh-ui"

import GameCreatorContainer from "containers/GameCreator"

import InfoSwitch from "components/GameCreator/InfoSwitch"
import MainPane from "components/GameCreator/MainPane"
import EntityExplorer from "components/GameCreator/EntityExplorer"
import DetailPane from "components/GameCreator/DetailPane"

import SettingsModal from "components/modals/GameSettings"
import PublishModal from "components/modals/Publish"
import PublishedModal from "components/modals/Published"

const getInfoComponent = (selectedPane, INFO_TYPES) => {
  switch (selectedPane) {
    case INFO_TYPES.INFO:
      return SettingsModal
    case INFO_TYPES.EXPLORE:
      return EntityExplorer
    default:
      return null
  }
}

const getActionComponent = (upcomingAction, ACTION_TYPES, isOpen) => {
  switch (upcomingAction) {
    case ACTION_TYPES.PUBLISH_GAME:
      return PublishModal
    case ACTION_TYPES.SHARE_GAME:
      return PublishedModal
    default:
      return isOpen ? DetailPane : null
  }
}

const GameCreator = () => {
  const { selectedPane, upcomingAction, INFO_TYPES, ACTION_TYPES } = useEditor()
  const { isOpen } = useInspector()

  const InfoComponent = getInfoComponent(selectedPane, INFO_TYPES)
  const ActionComponent = getActionComponent(
    upcomingAction,
    ACTION_TYPES,
    isOpen
  )

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

const MaybeGameCreator = () => {
  const { gameExists } = useGame()

  useEffect(() => {
    if (!gameExists) {
      navigate("/")
    }
  }, [gameExists])

  return gameExists ? <GameCreator /> : null
}

const CreatorPage = ({ creatorSlug, gameSlug }) => (
  <GameCreatorContainer creatorSlug={creatorSlug} gameSlug={gameSlug}>
    <MaybeGameCreator />
  </GameCreatorContainer>
)

export default CreatorPage
