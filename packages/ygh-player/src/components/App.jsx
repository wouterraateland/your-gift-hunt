import React from 'react'

import useGameState from 'hooks/useGameState'

import Theme from 'containers/Theme'

import Viewport from 'components/Viewport'
import Inventory from 'components/Inventory'
import ScreenContainer from 'components/ScreenContainer'
import DefaultScene from 'components/scenes/default'

const App = () => {
  const { items, objects, currentScreen } = useGameState()

  return (
    <Theme>
      <Viewport>
        <DefaultScene objects={objects} />
      </Viewport>
      <Inventory items={items} />
      <ScreenContainer currentScreen={currentScreen} />
    </Theme>
  )
}

export default App
