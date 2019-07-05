import { useCallback, useEffect, useRef, useState } from "react"
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

  const listGames = useCallback(
    options =>
      yghPlayer.current.listGames({
        ...options,
        playTokens: yghPlayer.current.gamePlays.map(({ id }) => id)
      }),
    []
  )

  const getLeaderboard = useCallback(
    (...args) => yghPlayer.current.getLeaderboard(...args),
    []
  )

  const getUserProfile = useCallback(
    (...args) => yghPlayer.current.getUserProfile(...args),
    []
  )

  const updateUser = useCallback(() => setUser(yghPlayer.current.user), [])

  const loginUser = useCallback(async (...args) => {
    await yghPlayer.current.loginUser(...args)
    updateUser()
  }, [])

  const registerUser = useCallback(async (...args) => {
    await yghPlayer.current.registerUser(...args)
    updateUser()
  }, [])

  const logoutUser = useCallback(async (...args) => {
    await yghPlayer.current.logoutUser(...args)
    updateUser()
  }, [])

  const requestPasswordReset = useCallback(
    (...args) => yghPlayer.current.requestPasswordReset(...args),
    []
  )
  const isResetTokenValid = useCallback(
    (...args) => yghPlayer.current.isResetTokenValid(...args),
    []
  )
  const resetPassword = useCallback(
    (...args) => yghPlayer.current.resetPassword(...args),
    []
  )

  const updateUserProfile = useCallback(async (...args) => {
    await yghPlayer.current.updateUserProfile(...args)
    updateUser()
  }, [])

  const updateUserPassword = useCallback(async (...args) => {
    await yghPlayer.current.updateUserPassword(...args)
    updateUser()
  }, [])

  const updateGameImage = useCallback(
    (...args) => yghPlayer.current.updateGameImage(...args),
    []
  )

  const startGamePlay = useCallback(async () => {
    const gameState = await yghPlayer.current.startGamePlay()
    setGameState(gameState)
    return gameState
  }, [])

  const rateGamePlay = useCallback(async (...args) => {
    const gameState = await yghPlayer.current.rateGamePlay(...args)
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
      yghPlayer.current.openSession()
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

  const loadGameFromContext = useCallback(
    runAsync(async gameIdentifier => {
      await yghPlayer.current.loadGameFromContext(gameIdentifier)
      updateAuthentication()
    }),
    []
  )

  const unloadGame = useCallback(() => {
    yghPlayer.current.playToken = null
    setGameState((yghPlayer.current.gameState = {}))
    setAuthentication({ status: null, method: null })
  }, [])

  const closeSession = useCallback(
    runAsync(async () => {
      if (yghPlayer.current.playToken) {
        await yghPlayer.current.closeSession()
      }
    }),
    []
  )

  useEffect(() => {
    window.addEventListener("beforeunload", closeSession)
    return () => {
      window.removeEventListener("beforeunload", closeSession)
    }
  }, [])

  return {
    error,
    isLoading,
    isAuthenticated: error ? false : authentication.status,
    authenticationMethod: authentication.method,
    isLoggedIn: !!user,
    user,
    gamePlays: yghPlayer.current.gamePlays,
    game: yghPlayer.current.game,
    playToken: yghPlayer.current.playToken,
    gameState,

    loginUser,
    registerUser,
    logoutUser,
    requestPasswordReset,
    isResetTokenValid,
    resetPassword,

    updateUserProfile,
    updateUserPassword,
    updateGameImage,

    listGames,
    getLeaderboard,
    getUserProfile,

    authenticate,
    loadGameFromContext,
    unloadGame,
    startGamePlay,
    rateGamePlay,
    dispatchAction,
    requestHints
  }
}

export default useYGHPlayer
