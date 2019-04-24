import { useCallback, useEffect, useState } from "react"
import _ from "utils"

const useStore = config => {
  const {
    initialState = {},
    rootReducer = _.identity,
    enhancer = _.identity
  } = config
  const [state, _setState] = useState(initialState)

  useEffect(() => {
    _setState(initialState)
  }, [initialState])

  const setState = useCallback(
    newState =>
      enhancer(
        _setState(state => ({
          ...state,
          ...newState
        }))
      ),
    [enhancer]
  )

  const dispatch = useCallback(action => enhancer(rootReducer(state, action)), [
    state,
    enhancer,
    rootReducer
  ])

  const read = useCallback(
    (key, defaultValue) =>
      state[key] === undefined ? defaultValue : state[key],
    [state]
  )

  const write = useCallback(
    (key, value) =>
      _setState(state =>
        enhancer({
          ...state,
          [key]: typeof value === "function" ? value(state[key]) : value
        })
      ),
    [enhancer]
  )

  return {
    state,
    setState,
    dispatch,
    read,
    write
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
    save(name)(
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
  load: key => window.localStorage.getItem(key) || "{}",
  save: key => value => window.localStorage.setItem(key, value)
})

export default useStore
