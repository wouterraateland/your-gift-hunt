import { useState } from "react"
import _ from "utils"

const useStore = ({
  initialState,
  rootReducer = _.identity,
  enhancer = _.identity
}) => {
  const [state, setState] = useState(initialState || {})

  return {
    state,
    setState: newState =>
      enhancer(
        setState(state => ({
          ...state,
          ...newState
        }))
      ),
    dispatch: action => enhancer(rootReducer(state, action)),
    read: (key, defaultValue) =>
      state[key] === undefined ? defaultValue : state[key],
    write: (key, value) =>
      setState(state =>
        enhancer({
          ...state,
          [key]: typeof value === "function" ? value(state[key]) : value
        })
      )
  }
}

export const createPersistentStoreCreator = ({
  serialize,
  deserialize,
  load,
  save
}) => ({ name = "store", persistKey = _.constant(true) }) => ({
  initialState: deserialize(load(name)),
  enhancer: state => {
    save(
      name,
      serialize(
        Object.keys(state)
          .filter(persistKey)
          .reduce((acc, key) => ({ ...acc, [key]: state[key] }), {})
      )
    )
    return state
  }
})

export const localStorageStoreCreator = createPersistentStoreCreator({
  serialize: JSON.stringify,
  deserialize: JSON.parse,
  load: key => window.localStorage.getItem(key),
  save: (key, value) => window.localStorage.setItem(key, value)
})

export default useStore
