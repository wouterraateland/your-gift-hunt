import React from "react"

import useEditor from "hooks/useEditor"

import Container from "./Container"
import LogicView from "./LogicView"
import GraphicView from "./GraphicView"

const ViewSwitch = () => {
  const { selectedView, selectView } = useEditor()

  return (
    <Container selectedView={selectedView}>
      <GraphicView
        isSelected={selectedView === "graphic"}
        onClick={() => selectView("graphic")}
      >
        Floor plan
      </GraphicView>
      <LogicView
        isSelected={selectedView === "logic"}
        onClick={() => selectView("logic")}
      >
        Logic
      </LogicView>
    </Container>
  )
}

export default ViewSwitch
