import React, { useContext } from "react"

import GameContext from "contexts/Game"

import Theme from "containers/Theme"

import Loader from "components/Loader"
import Viewport from "components/Viewport"
import Inventory from "components/Inventory"
import ScreenContainer from "components/ScreenContainer"
import DragImage from "components/DragImage"

import DefaultScene from "components/scenes/default"

const App = () => {
  const { instances, isLoading } = useContext(GameContext)
  const { inventoryItems, nonInventoryItems, objects } = instances

  return (
    <Theme>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Viewport>
            <DefaultScene objects={objects} items={nonInventoryItems} />
          </Viewport>
          <Inventory items={inventoryItems} />
          <ScreenContainer />
          <DragImage />
        </>
      )}
    </Theme>
  )
}

export default App
