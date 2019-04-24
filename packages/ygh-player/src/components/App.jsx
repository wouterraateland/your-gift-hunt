import React from "react"
import { Router } from "@reach/router"

import IndexPage from "pages/index"
import GamePage from "pages/game"
import NotFoundPage from "pages/404"

const App = () => (
  <Router>
    <IndexPage path="/" />
    <GamePage path="/:creatorSlug/:gameSlug" />
    <NotFoundPage default />
  </Router>
)

export default App
