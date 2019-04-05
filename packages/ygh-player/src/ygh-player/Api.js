const BASE_URL = "https://ygh-api.herokuapp.com"

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

  getGameBySlug = ({ creatorSlug, gameSlug }) =>
    this.post("getGameBySlug", {
      body: { creatorSlug, gameSlug }
    })

  getGameById = ({ gameId }) =>
    this.post("getGameById", {
      body: { gameId }
    })

  createPlayToken = ({ gameId, accessCode }) =>
    this.post("createPlayToken", {
      body: { gameId, accessCode }
    })

  isPlayTokenValid = ({ gameId, playToken }) =>
    this.post("isPlayTokenValid", {
      body: { gameId, playToken }
    })

  getGameState = ({ playToken }) =>
    this.post("getGameState", {
      body: { playToken }
    })

  dispatchAction = ({ playToken, action }) =>
    this.post("dispatchAction", {
      body: {
        playToken,
        action
      }
    })
}

export default Api
