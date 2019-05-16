const BASE_URL =
  process.env.REACT_APP_YGH_API_URL || "https://api.herokuapp.com"

const t = f => options => f(options || {})

class Api {
  key
  constructor(key) {
    this.key = key
  }

  async request(lambda, params = {}) {
    const response = await fetch(`${BASE_URL}/${lambda}`, {
      ...params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": this.key,
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
}

export default Api
