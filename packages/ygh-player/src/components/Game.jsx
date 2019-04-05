import React, { useContext } from "react"

import GameContext from "contexts/Game"

import Viewport from "components/Viewport"
import Inventory from "components/Inventory"
import ScreenContainer from "components/ScreenContainer"
import DragImage from "components/DragImage"

import DefaultScene from "components/scenes/default"

const App = () => {
  const { entities } = useContext(GameContext)
  const { inventoryItems, nonInventoryItems, objects } = entities

  return (
    <>
      <Viewport>
        <DefaultScene objects={objects} items={nonInventoryItems} />
      </Viewport>
      <Inventory items={inventoryItems} />
      <ScreenContainer />
      <DragImage />
    </>
  )
}

export default App
