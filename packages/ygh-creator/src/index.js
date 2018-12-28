import 'typeface-playfair-display'
import 'typeface-montserrat'

import React from 'react'
import * as ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import firebaseConfig from 'config/firebase'

import configureStore from './store'

import { Provider } from 'react-redux'
import App from 'components/App'

firebase.initializeApp(firebaseConfig.firebase)
firebase.firestore().settings({ timestampsInSnapshots: true })

const root = document.getElementById('app-root')
const store = configureStore()

const rrfProps = {
  firebase,
  config: firebaseConfig.rrf,
  dispatch: store.dispatch,
  createFirestoreInstance
}

const render = (Component) =>
  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Component />
      </ReactReduxFirebaseProvider>
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
