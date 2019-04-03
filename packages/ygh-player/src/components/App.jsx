import React from "react"
import { Router } from "@reach/router"

import NotFoundPage from "pages/404"
import GamePage from "pages/game"

const App = () => (
  <Router>
    <GamePage path="/:creatorSlug/:gameSlug" />
    <NotFoundPage default />
  </Router>
)

export default App
