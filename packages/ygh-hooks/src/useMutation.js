import { useCallback, useState } from "react"

const useMutation = (f, deps = []) => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    success: false
  })

  const run = useCallback(async (...args) => {
    setState(state => ({ ...state, isLoading: true, success: false }))
    try {
      const v = await f(...args)
      setState({ isLoading: false, error: null, success: true })
      return v
    } catch (error) {
      setState({ isLoading: false, error, success: false })
      return null
    }
  }, deps)

  return [state, run]
}

export default useMutation
