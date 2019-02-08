import React from "react"

import ErrorBoundary from "react-error-boundary"
import { AuthProvider } from "contexts/Auth"

import Theme from "containers/Theme"
import Router from "containers/Router"

const App = () => (
  <Theme>
    <AuthProvider>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </AuthProvider>
  </Theme>
)

export default App
