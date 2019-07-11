import { useCallback, useEffect, useState } from "react"

const useStore = config => {
  const { initialState = {}, rootReducer = x => x, enhancer = x => x } = config
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

export default useStore
