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
import DetailPane from "components/GameCreator/DetailPane"

import GameSettings from "components/GameCreator/GameSettings"
import EntityExplorer from "components/GameCreator/EntityExplorer"
import Toolbox from "components/GameCreator/Toolbox"

import PublishPane from "components/GameCreator/PublishPane"
import SharePane from "components/GameCreator/SharePane"

const getInfoComponent = (selectedPane, INFO_TYPES) => {
  switch (selectedPane) {
    case INFO_TYPES.INFO:
      return GameSettings
    case INFO_TYPES.EXPLORE:
      return EntityExplorer
    case INFO_TYPES.NEW_ENTITY:
      return Toolbox
    default:
      return null
  }
}

const getActionComponent = (upcomingAction, ACTION_TYPES, isOpen) => {
  switch (upcomingAction ? upcomingAction.type : null) {
    case ACTION_TYPES.PUBLISH_GAME:
      return PublishPane
    case ACTION_TYPES.SHARE_GAME:
      return SharePane
    default:
      return isOpen ? DetailPane : null
  }
}

const GameCreator = () => {
  const { selectedTab, upcomingAction, INFO_TYPES, ACTION_TYPES } = useEditor()
  const { isOpen } = useInspector()

  const InfoComponent = getInfoComponent(selectedTab, INFO_TYPES)
  const ActionComponent = getActionComponent(
    upcomingAction,
    ACTION_TYPES,
    isOpen
  )

  return (
    <Layout>
      <InfoSwitch />
      <SplitPane primary="first" initialSize={256}>
        {InfoComponent && <InfoComponent />}
        <SplitPane primary="second" initialSize={256} maxSize={384}>
          <MainPane />
          {ActionComponent && <ActionComponent />}
        </SplitPane>
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

const CreatorPage = ({ gameId }) => (
  <GameCreatorContainer gameId={gameId}>
    <MaybeGameCreator />
  </GameCreatorContainer>
)

export default CreatorPage
