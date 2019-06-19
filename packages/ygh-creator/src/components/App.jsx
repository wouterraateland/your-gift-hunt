import React, { Suspense } from "react"

import ErrorBoundary from "react-error-boundary"
import { YGHPlayerProvider } from "ygh-player/react-hook"
import { ViewportProvider } from "contexts/Viewport"

import Theme from "containers/Theme"
import Router from "containers/Router"

import { Loader } from "your-gift-hunt/ui"

const App = () => (
  <Theme>
    <ViewportProvider>
      <Suspense fallback={<Loader />}>
        <YGHPlayerProvider>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </YGHPlayerProvider>
      </Suspense>
    </ViewportProvider>
  </Theme>
)

export default App
