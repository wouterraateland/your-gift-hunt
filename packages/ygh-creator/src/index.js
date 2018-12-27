import React from 'react'
import * as ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import configureStore from './store'

import { Provider } from 'react-redux'
import App from 'components/App'

const root = document.getElementById('app-root')
const store = configureStore()

const render = (Component) =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    root
  )

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () =>
    render(require('./components/App').default)
  )
}

serviceWorker.unregister()
