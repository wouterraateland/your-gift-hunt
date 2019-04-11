import React from "react"

import Viewport from "components/Viewport"
import Inventory from "components/Inventory"
import ScreenContainer from "components/ScreenContainer"
import DragImage from "components/DragImage"

import DefaultScene from "components/scenes/default"

const Game = () => (
  <>
    <Viewport>
      <DefaultScene />
    </Viewport>
    <Inventory />
    <ScreenContainer />
    <DragImage />
  </>
)

export default Game
