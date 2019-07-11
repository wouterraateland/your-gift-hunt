import React from "react"

import { YGHPlayerProvider } from "ygh-sdk"
import { Theme } from "ygh-ui"

import Router from "containers/Router"

const App = () => (
  <Theme>
    <YGHPlayerProvider apiKey={process.env.REACT_APP_YGH_PLAYER_KEY}>
      <Router />
    </YGHPlayerProvider>
  </Theme>
)

export default App
