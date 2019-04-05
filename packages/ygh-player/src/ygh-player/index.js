import Api from "./Api"

const getNextState = (state, stateUpdate) => ({
  ...state,
  ...stateUpdate,
  entities: state.entities
    .filter(entity => !stateUpdate.entities.some(({ id }) => id === entity.id))
    .concat(stateUpdate.entities)
})

class YGHPlayer {
  api
  game
  playToken
  gameState

  constructor(apiToken) {
    this.api = new Api(apiToken)
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

    const isValid = await this.api.isPlayTokenValid({
      gameId: this.game.id,
      playToken
    })

    if (isValid) {
      this.playToken = playToken
    } else {
      throw Error("Invalid play token")
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

    if (!this.gameState) {
      this.gameState = await this.api.getGameState({
        playToken: this.playToken
      })
    }
    return this.gameState
  }

  async dispatchAction(action) {
    this.ensurePlayToken()

    const stateUpdate = await this.api.dispatchAction({
      playToken: this.playToken,
      action
    })
    this.gameState = getNextState(this.gameState, stateUpdate)
    return this.gameState
  }
}

export default YGHPlayer
