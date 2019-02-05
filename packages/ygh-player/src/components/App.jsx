import React from 'react'
import { Router, Redirect } from '@reach/router'

import { DragProvider } from 'contexts/Drag'
import { GameProvider } from 'contexts/Game'
import { ScreenProvider } from 'contexts/Screen'

import Game from 'components/Game'

const GamePage = ({ creatorSlug, gameSlug }) => (
  <DragProvider>
    <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
      <ScreenProvider>
        <Game />
      </ScreenProvider>
    </GameProvider>
  </DragProvider>
)

const App = () => (
  <Router>
    <GamePage path="/:creatorSlug/:gameSlug" />
    <Redirect from="/" to="/wouter-raateland/pioneer-hunt" />
  </Router>
)

export default App
