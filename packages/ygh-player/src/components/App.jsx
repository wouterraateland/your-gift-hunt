import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import Theme from 'containers/Theme'

import Viewport from 'components/Viewport'
import Inventory from 'components/Inventory'
// import ScreenContainer from 'components/ScreenContainer'
import DefaultScene from 'components/scenes/default'

const App = () => {
  const { state } = useContext(GameContext)
  const { items, objects } = state

  return (
    <Theme>
      <Viewport>
        <DefaultScene objects={objects} />
      </Viewport>
      <Inventory items={items} />
      {/* <ScreenContainer currentScreen={currentScreen} /> */}
    </Theme>
  )
}

export default App
