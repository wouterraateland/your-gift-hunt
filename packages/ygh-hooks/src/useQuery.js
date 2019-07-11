import { useCallback, useEffect, useState } from "react"

const useQuery = f => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null
  })

  const refetch = useCallback(async () => {
    setState(state => ({ ...state, isLoading: true, error: null }))
    try {
      const data = await f()
      setState({ data, isLoading: false, error: null })
    } catch (error) {
      setState(state => ({ ...state, isLoading: false, error }))
    }
  }, [f])

  useEffect(() => {
    refetch()
  }, [])

  return [state, { refetch }]
}

export default useQuery
