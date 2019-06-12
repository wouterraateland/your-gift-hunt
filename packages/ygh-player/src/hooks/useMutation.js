import { useCallback, useState } from "react"

const useMutation = f => {
  const [state, setState] = useState({
    isLoading: false,
    error: null
  })

  const run = useCallback(
    async (...args) => {
      setState({ isLoading: true, error: null })
      try {
        const v = await f(...args)
        setState({ isLoading: false, error: null })
        return v
      } catch (error) {
        setState({ isLoading: false, error })
        return null
      }
    },
    [f]
  )

  return [state, run]
}

export default useMutation
