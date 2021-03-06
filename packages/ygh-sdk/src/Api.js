const BASE_URL =
  process.env.REACT_APP_YGH_API_URL || "https://api.yourgifthunt.com"

const t = f => options => f(options || {})

const buildFormData = object => {
  const fd = new FormData()
  Object.keys(object).forEach(key => {
    fd.append(key, object[key])
  })
  return fd
}

class Api {
  apiKey
  userToken

  constructor(apiKey) {
    this.apiKey = apiKey
  }

  setUserToken(userToken) {
    this.userToken = userToken
  }

  async request(lambda, params = {}) {
    const containsFile = params.body
      ? Object.values(params.body).some(v => v instanceof File)
      : false

    const response = await fetch(`${BASE_URL}/${lambda}`, {
      ...params,
      headers: {
        Accept: "application/json",
        ...(containsFile ? {} : { "Content-Type": "application/json" }),
        "X-API-Key": this.apiKey,
        ...(this.userToken
          ? {
              Authorization: `Bearer ${this.userToken}`
            }
          : {}),
        ...params.headers
      },
      body: params.body
        ? containsFile
          ? buildFormData(params.body)
          : JSON.stringify(params.body)
        : null
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      const error = await response.json()
      throw error
    }
    const json = await response.json()
    return json
  }

  get = (url, params) => this.request(url, { ...params, method: "GET" })
  post = (url, params) => this.request(url, { ...params, method: "POST" })

  getGameBySlug = t(({ creatorSlug, gameSlug }) =>
    this.post("getGameBySlug", { body: { creatorSlug, gameSlug } })
  )

  getGameById = t(({ gameId }) =>
    this.post("getGameById", { body: { gameId } })
  )

  createPlayToken = t(({ gameId, accessCode }) =>
    this.post("createPlayToken", { body: { gameId, accessCode } })
  )

  isPlayTokenValid = t(({ gameId, playToken }) =>
    this.post("isPlayTokenValid", { body: { gameId, playToken } })
  )

  getGameState = t(({ playToken }) =>
    this.post("getGameState", { body: { playToken } })
  )

  startGamePlay = t(({ playToken }) =>
    this.post("startGamePlay", { body: { playToken } })
  )

  rateGamePlay = t(({ playToken, rating }) =>
    this.post("rateGamePlay", { body: { playToken, rating } })
  )

  openSession = t(({ playToken }) =>
    this.post("openSession", { body: { playToken } })
  )

  closeSession = t(({ playToken }) =>
    this.post("closeSession", { body: { playToken } })
  )

  requestHints = t(({ playToken }) =>
    this.post("requestHints", { body: { playToken } })
  )

  dispatchAction = t(({ playToken, action }) =>
    this.post("dispatchAction", { body: { playToken, action } })
  )

  listGames = t(({ skip, amount, orderBy, direction, playTokens }) =>
    this.post("listGames", {
      body: { skip, amount, orderBy, direction, playTokens }
    })
  )

  getLeaderboard = t(({ skip, amount, gameId }) =>
    this.post("getLeaderboard", {
      body: { skip, amount, gameId }
    })
  )

  getUserProfile = t(params => this.post("getUserProfile", { body: params }))

  loginUser = t(({ email, password, playTokens }) =>
    this.post("loginUser", { body: { email, password, playTokens } })
  )

  registerUser = t(
    ({
      firstName,
      middleName,
      lastName,
      username,
      email,
      password,
      playTokens
    }) =>
      this.post("registerUser", {
        body: {
          firstName,
          middleName,
          lastName,
          username,
          email,
          password,
          playTokens
        }
      })
  )

  getUser = t(() => this.post("getUser"))

  logoutUser = t(() => this.post("logoutUser"))

  requestPasswordReset = t(({ email }) =>
    this.post("requestPasswordReset", { body: { email } })
  )
  isResetTokenValid = t(({ resetToken }) =>
    this.post("isResetTokenValid", { body: { resetToken } })
  )
  resetPassword = t(({ resetToken, newPassword, confirmPassword }) =>
    this.post("resetPassword", {
      body: {
        resetToken,
        newPassword,
        confirmPassword
      }
    })
  )

  updateUserProfile = t(body => this.post("updateUserProfile", { body }))
  updateUserPassword = t(body => this.post("updateUserPassword", { body }))

  updateGameImage = t(({ gameId, image }) =>
    this.post("updateGameImage", { body: { gameId, image } })
  )
}

export default Api
