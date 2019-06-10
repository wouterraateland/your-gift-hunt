import { useState } from "react"

const useAsync = () => {
  const [state, setState] = useState(false)

  const runAsync = f => async (...args) => {
    setState({ isLoading: true, error: null })
    try {
      const v = await f(...args)
      setState({ isLoading: false, error: null })
      return v
    } catch (error) {
      setState({ isLoading: false, error })
      return null
    }
  }

  return [state, runAsync]
}

export default useAsync
