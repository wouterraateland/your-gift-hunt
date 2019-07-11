import React, { Suspense } from "react"

import { YGHPlayerProvider } from "ygh-player/react-hook"
import { ViewportProvider } from "contexts/Viewport"

import Theme from "containers/Theme"
import Router from "containers/Router"
import ErrorBoundary from "containers/ErrorBoundary"

import { Loader } from "ygh-ui"

const App = () => (
  <Theme>
    <ViewportProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <YGHPlayerProvider>
            <Router />
          </YGHPlayerProvider>
        </Suspense>
      </ErrorBoundary>
    </ViewportProvider>
  </Theme>
)

export default App
