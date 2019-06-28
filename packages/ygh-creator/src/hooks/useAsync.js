import { useState } from "react"

const useAsync = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    success: false
  })

  const runAsync = f => async (...args) => {
    try {
      setState(state => ({ ...state, isLoading: true }))
      await f(...args)
      setState(state => ({ ...state, isLoading: false, error: null }))
    } catch (error) {
      setState(state => ({ ...state, isLoading: false, error }))
    }
  }

  return [state, runAsync]
}

export default useAsync
