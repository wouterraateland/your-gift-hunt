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
  const [gameState, setGameState] = useState([])
  const [authentication, setAuthentication] = useState({
    status: null,
    method: null
  })

  const dispatchAction = useCallback(async action => {
    const gameState = await yghPlayer.current.dispatchAction(action)
    setGameState(gameState)
    return gameState
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
    load()
  }, [])

  return {
    isAuthenticated: authentication.status,
    authenticationMethod: authentication.method,
    authenticate,
    isLoading,
    dispatchAction,
    gameState,
    game: yghPlayer.current.game
  }
}

export default useYGHPlayer