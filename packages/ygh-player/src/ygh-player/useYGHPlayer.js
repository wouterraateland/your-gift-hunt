import { useCallback, useRef, useState } from "react"
import YGHPlayerWeb from "./YGHPlayerWeb"

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

const useYGHPlayer = ({ apiKey }) => {
  const yghPlayer = useRef(new YGHPlayerWeb(apiKey))
  const [{ isLoading, error }, runAsync] = useAsync()
  const [user, setUser] = useState(yghPlayer.current.user)
  const [gameState, setGameState] = useState({})
  const [authentication, setAuthentication] = useState({
    status: null,
    method: null
  })

  const listPublicGames = useCallback(
    runAsync((...args) => yghPlayer.current.listPublicGames(...args)),
    []
  )

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

  const updateUser = useCallback(() => {
    setUser(yghPlayer.current.user)
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

  const loadGameFromContext = useCallback(
    runAsync(async gameIdentifier => {
      await yghPlayer.current.loadGameFromContext(gameIdentifier)
      updateAuthentication()
    }),
    []
  )

  const loginUser = useCallback(
    runAsync(async (...args) => {
      await yghPlayer.current.loginUser(...args)
      updateUser()
    }),
    []
  )

  const registerUser = useCallback(
    runAsync(async (...args) => {
      await yghPlayer.current.registerUser(...args)
      updateUser()
    }),
    []
  )

  const logoutUser = useCallback(
    runAsync(async (...args) => {
      await yghPlayer.current.logoutUser(...args)
      updateUser()
    }),
    []
  )

  return {
    error,
    isLoading,
    isAuthenticated: error ? false : authentication.status,
    authenticationMethod: authentication.method,
    isLoggedIn: !!user,
    user,
    game: yghPlayer.current.game,
    playToken: yghPlayer.current.playToken,
    gameState,

    loginUser,
    registerUser,
    logoutUser,

    listPublicGames,
    authenticate,
    loadGameFromContext,
    startGamePlay,
    dispatchAction,
    requestHints
  }
}

export default useYGHPlayer
