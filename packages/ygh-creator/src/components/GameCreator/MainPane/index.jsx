import React from "react"

import TabPane from "components/TabPane"

import EditorPane from "components/GameCreator/EditorPane"
import GraphicPane from "components/GameCreator/GraphicPane"
import Toolbox from "components/GameCreator/Toolbox"
import ActionBar from "components/GameCreator/ActionBar"

const MainPane = () => (
  <TabPane>
    <TabPane.Tab label="Logic">
      <EditorPane />
      <Toolbox />
    </TabPane.Tab>
    <TabPane.Tab label="Floor plan">
      <GraphicPane />
      <ActionBar />
      <Toolbox />
    </TabPane.Tab>
  </TabPane>
)

export default MainPane
