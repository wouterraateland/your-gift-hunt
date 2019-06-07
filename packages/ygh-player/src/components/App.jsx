import React from "react"

import { YGHPlayerProvider } from "ygh-player/react-hook"

import Theme from "containers/Theme"
import Router from "containers/Router"

const App = () => (
  <Theme>
    <YGHPlayerProvider apiKey={process.env.REACT_APP_YGH_PLAYER_KEY}>
      <Router />
    </YGHPlayerProvider>
  </Theme>
)

export default App
