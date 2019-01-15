import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { StoreProvider } from 'contexts/Store'
import { localStorageStoreCreator } from 'hooks/useStore'

import App from 'components/App'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}

const store = localStorageStoreCreator({
  name: 'store',
  persistKey: key => !['selectedPieceId', 'selectedBoardId'].includes(key),
})

const root = document.getElementById('app-root')

const render = (Component) =>
  ReactDOM.render(
    <StoreProvider store={store}>
      <Component />
    </StoreProvider>,
    root
  )

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () =>
    render(require('./components/App').default)
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
