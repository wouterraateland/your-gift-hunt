import Api from "./Api"

const getNextState = (state, stateUpdate) => ({
  ...state,
  ...stateUpdate,
  entities: state.entities
    .filter(entity => !stateUpdate.entities.some(({ id }) => id === entity.id))
    .concat(stateUpdate.entities)
})

const parseServerState = state => ({
  ...state,
  entities: state.entities.map(entity => ({
    ...entity,
    inputs: entity.inputs.map(input => ({
      ...input,
      value: input.value ? JSON.parse(input.value) : undefined
    })),
    fields: entity.fields.map(field => ({
      ...field,
      value: field.value ? JSON.parse(field.value) : undefined
    }))
  }))
})

class YGHPlayer {
  api
  user
  game
  playToken
  gameState

  constructor(apiToken) {
    this.api = new Api(apiToken)
  }

  async listGames(...args) {
    return await this.api.listGames(...args)
  }

  async getLeaderboard(...args) {
    return await this.api.getLeaderboard(...args)
  }

  async getUserProfile(...args) {
    return await this.api.getUserProfile(...args)
  }

  async loadGame({ creatorSlug, gameSlug, gameId }) {
    this.game = await (gameId
      ? this.api.getGameById({ gameId })
      : this.api.getGameBySlug({ creatorSlug, gameSlug }))

    return this.game
  }

  ensureGameIsLoaded() {
    if (!this.game) {
      throw Error("No game loaded")
    }
  }

  ensurePlayToken() {
    if (!this.playToken) {
      throw Error("No play token set")
    }
  }

  async setPlayToken(playToken) {
    this.ensureGameIsLoaded()

    try {
      const isValid = await this.api.isPlayTokenValid({
        gameId: this.game.id,
        playToken
      })

      if (isValid) {
        this.playToken = playToken
      } else {
        throw Error("Invalid play token")
      }
    } catch (error) {
      throw Error(`Invalid play token: ${error}`)
    }
    await this.getGameState()
    return this.playToken
  }

  async createPlayToken({ accessCode }) {
    this.ensureGameIsLoaded()

    try {
      this.playToken = await this.api.createPlayToken({
        gameId: this.game.id,
        accessCode
      })
    } catch (error) {
      throw new Error("Access code invalid")
    }

    await this.getGameState()
    return this.playToken
  }

  async getGameState() {
    this.ensurePlayToken()

    this.gameState = parseServerState(
      await this.api.getGameState({
        playToken: this.playToken
      })
    )

    return this.gameState
  }

  async startGamePlay() {
    this.ensurePlayToken()

    const stateUpdate = await this.api.startGamePlay({
      playToken: this.playToken
    })
    this.gameState = getNextState(this.gameState, parseServerState(stateUpdate))
    return this.gameState
  }

  async rateGamePlay(rating) {
    this.ensurePlayToken()

    const stateUpdate = await this.api.rateGamePlay({
      playToken: this.playToken,
      rating
    })
    this.gameState = getNextState(this.gameState, parseServerState(stateUpdate))
    return this.gameState
  }

  async openSession() {
    this.ensurePlayToken()
    await this.api.openSession({ playToken: this.playToken })
  }

  async closeSession() {
    this.ensurePlayToken()
    await this.api.closeSession({ playToken: this.playToken })
  }

  async dispatchAction(action) {
    this.ensurePlayToken()

    const stateUpdate = await this.api.dispatchAction({
      playToken: this.playToken,
      action
    })
    this.gameState = getNextState(this.gameState, parseServerState(stateUpdate))
    return this.gameState
  }

  async requestHints() {
    this.ensurePlayToken()

    const hints = await this.api.requestHints({ playToken: this.playToken })
    this.gameState = { ...this.gameState, hints }
    return this.gameState.hints
  }

  setUser(user) {
    this.api.setUserToken(user ? user.token : null)
    this.user = user
    return this.user
  }

  async loginUser(...args) {
    return this.setUser(await this.api.loginUser(...args))
  }

  async registerUser(...args) {
    return this.setUser(await this.api.registerUser(...args))
  }

  async getUser(...args) {
    return this.setUser(await this.api.getUser(...args))
  }

  async logoutUser(...args) {
    const res = await this.api.logoutUser(...args)
    this.setUser(null)
    return res
  }

  async requestPasswordReset(...args) {
    return await this.api.requestPasswordReset(...args)
  }
  async isResetTokenValid(...args) {
    return await this.api.isResetTokenValid(...args)
  }
  async resetPassword(...args) {
    return await this.api.resetPassword(...args)
  }

  async updateUserProfile(...args) {
    return this.setUser(await this.api.updateUserProfile(...args))
  }

  async updateUserPassword(...args) {
    return this.setUser(await this.api.updateUserPassword(...args))
  }

  async updateGameImage(...args) {
    return await this.api.updateGameImage(...args)
  }
}

export default YGHPlayer
