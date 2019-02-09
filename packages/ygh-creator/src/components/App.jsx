import React, { Suspense } from "react"

import ErrorBoundary from "react-error-boundary"
import { AuthProvider } from "contexts/Auth"

import Theme from "containers/Theme"
import Router from "containers/Router"

import { Loader } from "your-gift-hunt/ui"

const App = () => (
  <Theme>
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </AuthProvider>
    </Suspense>
  </Theme>
)

export default App
