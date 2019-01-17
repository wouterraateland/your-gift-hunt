import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import Theme from 'containers/Theme'

import Viewport from 'components/Viewport'
import Inventory from 'components/Inventory'
import ScreenContainer from 'components/ScreenContainer'
import DragImage from 'components/DragImage'

import DefaultScene from 'components/scenes/default'

const App = () => {
  const { instances } = useContext(GameContext)
  const { items, objects } = instances

  return (
    <Theme>
      <Viewport>
        <DefaultScene objects={objects} />
      </Viewport>
      <Inventory items={items} />
      <ScreenContainer />
      <DragImage />
    </Theme>
  )
}

export default App
