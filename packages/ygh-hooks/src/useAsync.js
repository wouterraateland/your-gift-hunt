import { useState } from "react"

const useAsync = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    success: false
  })

  const runAsync = f => async (...args) => {
    try {
      setState(state => ({ ...state, isLoading: true, success: false }))
      await f(...args)
      setState({ isLoading: false, error: null, success: true })
    } catch (error) {
      setState({ isLoading: false, error, success: false })
    }
  }

  return [state, runAsync]
}

export default useAsync
