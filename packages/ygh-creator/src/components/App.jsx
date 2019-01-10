import React from 'react'

import ErrorBoundary from 'react-error-boundary'

import Theme from 'containers/Theme'
import Auth from 'containers/Auth'
import Router from 'containers/Router'

const App = () => (
  <Theme>
    <Auth>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </Auth>
  </Theme>
)

export default App
