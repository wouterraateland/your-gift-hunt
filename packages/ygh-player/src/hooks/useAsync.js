import { useCallback, useEffect, useState } from "react"
import _ from "utils"

const useAsync = (f = _.noop, inputs = []) => {
  const [state, setState] = useState({
    isLoading: true,
    error: null,
    data: null
  })

  const run = useCallback(async () => {
    setState(state => ({ ...state, isLoading: true }))
    try {
      const data = await f()
      setState({ isLoading: false, error: null, data })
    } catch (error) {
      setState(state => ({ ...state, isLoading: false, error }))
    }
    setState(state => ({ ...state, isLoading: false }))
  }, [f, ...inputs])

  useEffect(() => {
    run()
  }, [f, ...inputs])

  return {
    ...state,
    run
  }
}

export default useAsync
