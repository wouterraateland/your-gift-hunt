import { useCallback, useEffect, useRef, useState } from "react"
import YGHPlayerWeb from "./YGHPlayerWeb"

const useAsync = () => {
  const [isLoading, setLoading] = useState(false)

  const runAsync = f => async (...args) => {
    setLoading(true)
    const v = await f(...args)
    setLoading(false)
    return v
  }

  return {
    isLoading,
    runAsync
  }
}

const useYGHPlayer = (apiKey, gameIdentifier) => {
  const yghPlayer = useRef(new YGHPlayerWeb(apiKey))
  const { isLoading, runAsync } = useAsync()
  const [error, setError] = useState(null)
  const [gameState, setGameState] = useState({})
  const [authentication, setAuthentication] = useState({
    status: null,
    method: null
  })

  const startGamePlay = useCallback(async () => {
    const gameState = await yghPlayer.current.startGamePlay()
    setGameState(gameState)
    return gameState
  }, [])

  const dispatchAction = useCallback(async action => {
    const gameState = await yghPlayer.current.dispatchAction(action)
    setGameState(gameState)
    return gameState
  }, [])

  const requestHints = useCallback(async () => {
    const hints = await yghPlayer.current.requestHints()
    setGameState(yghPlayer.current.gameState)
    return hints
  }, [])

  const updateAuthentication = useCallback(() => {
    if (yghPlayer.current.playToken) {
      setGameState(yghPlayer.current.gameState)
      setAuthentication({ status: true })
    } else {
      setAuthentication({
        status: false,
        method: yghPlayer.current.game.accessType
      })
    }
  }, [])

  const authenticate = useCallback(
    runAsync(async accessCode => {
      try {
        await yghPlayer.current.createPlayToken({ accessCode })
      } catch (err) {}
      updateAuthentication()
    }),
    []
  )

  const load = useCallback(
    runAsync(async () => {
      await yghPlayer.current.loadFromContext(gameIdentifier)
      updateAuthentication()
    }),
    []
  )

  useEffect(() => {
    load().catch(setError)
  }, [])

  return error
    ? { error, gameState: {}, isLoading: false, isAuthenticated: false }
    : {
        isAuthenticated: authentication.status,
        authenticationMethod: authentication.method,
        authenticate,
        isLoading,
        startGamePlay,
        dispatchAction,
        requestHints,
        gameState,
        game: yghPlayer.current.game,
        playToken: yghPlayer.current.playToken
      }
}

export default useYGHPlayer
