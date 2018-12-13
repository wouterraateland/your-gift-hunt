import React from 'react'
import { Router } from '@reach/router'

import PrivateRoute from 'components/PrivateRoute'
import Creator from './creator'

const App = () => (
  <Router>
    <PrivateRoute path="/creator" component={Creator} />
  </Router>
)

export default App
