import { createStore } from 'redux'
import rootReducer from 'ducks'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  if (module.hot) {
    module.hot.accept('./ducks', () => {
      const nextRootReducer = require('./ducks')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
