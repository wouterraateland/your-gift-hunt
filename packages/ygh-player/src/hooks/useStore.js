import { useState } from 'react'

const id = x => x

const useStore = ({ initialState, rootReducer=id, enhancer=id }) => {
  const [state, setState] = useState(initialState || {})

  return {
    state,
    setState: newState => enhancer(setState(state => ({
      ...state,
      ...newState
    }))),
    dispatch: action => enhancer(rootReducer(state, action)),
    read: (key, defaultValue) => state[key] === undefined
      ? defaultValue
      : state[key],
    write: (key, value) => setState(state => enhancer({
      ...state,
      [key]: typeof value === 'function' ? value(state[key]) : value,
    }))
  }
}

export default useStore
