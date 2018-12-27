import { createStore, compose } from 'redux'
import rootReducer from 'ducks'
import firebaseConfig from 'config/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'

export default function configureStore(initialState) {
  firebase.initializeApp(firebaseConfig.firebase)
  firebase.firestore().settings({ timestampsInSnapshots: true })

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      reactReduxFirebase(firebase, firebaseConfig.rrfConfig),
      reduxFirestore(firebase),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  if (module.hot) {
    module.hot.accept('./ducks', () => {
      const nextRootReducer = require('./ducks')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
