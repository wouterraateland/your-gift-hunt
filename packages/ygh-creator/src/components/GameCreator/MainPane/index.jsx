import React from "react"

import useEditor from "hooks/useEditor"

import EditorPane from "components/GameCreator/EditorPane"
import GraphicPane from "components/GameCreator/GraphicPane"
import ActionBar from "components/GameCreator/ActionBar"

const MainPane = () => {
  const { selectedView, VIEW_TYPES } = useEditor()

  return selectedView === VIEW_TYPES.LOGIC ? (
    <EditorPane />
  ) : (
    <>
      <GraphicPane />
      <ActionBar />
    </>
  )
}

export default MainPane
