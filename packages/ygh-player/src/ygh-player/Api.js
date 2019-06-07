const BASE_URL =
  process.env.REACT_APP_YGH_API_URL || "https://api.yourgifthunt.com"

const t = f => options => f(options || {})

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
    const response = await fetch(`${BASE_URL}/${lambda}`, {
      ...params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
        ...(this.userToken
          ? {
              Authorization: `Bearer ${this.userToken}`
            }
          : {}),
        ...params.headers
      },
      body: params.body ? JSON.stringify(params.body) : null
    })

    if (!response.ok) {
      throw new Error(await response.text())
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

  requestHints = t(({ playToken }) =>
    this.post("requestHints", { body: { playToken } })
  )

  dispatchAction = t(({ playToken, action }) =>
    this.post("dispatchAction", { body: { playToken, action } })
  )

  listPublicGames = t(({ skip, amount, orderBy, direction }) =>
    this.post("listPublicGames", { body: { skip, amount, orderBy, direction } })
  )

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
}

export default Api
