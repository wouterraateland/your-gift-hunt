import React, { Suspense } from "react"

import ErrorBoundary from "react-error-boundary"
import { YGHPlayerProvider } from "ygh-player/react-hook"

import Theme from "containers/Theme"
import Router from "containers/Router"

import { Loader } from "your-gift-hunt/ui"

const App = () => (
  <Theme>
    <Suspense fallback={<Loader />}>
      <YGHPlayerProvider>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </YGHPlayerProvider>
    </Suspense>
  </Theme>
)

export default App
