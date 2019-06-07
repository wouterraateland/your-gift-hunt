import querystring from "querystring"
import YGHPlayer from "./YGHPlayer"
import playTokensStore from "./playTokensStore"
import userStore from "./userStore"

class YGHPlayerWeb extends YGHPlayer {
  constructor(...args) {
    super(...args)
    super.setUser(userStore.read())
  }

  async loadGameFromContext(gameIdentifier) {
    if (gameIdentifier) {
      await super.loadGame(gameIdentifier)
    } else {
      throw Error("No game identifier")
    }

    const params = querystring.decode(window.location.search.substr(1))

    if (params && params.playToken) {
      try {
        await this.setPlayToken(params.playToken)
      } catch (error) {
        if (this.game.privacy === "PUBLIC") {
          await this.createPlayToken({ gameId: this.game.id })
        }
      }
      window.history.replaceState({}, "", window.location.pathname)
    }

    if (!this.playToken) {
      const gamePlays = this.user ? this.user.plays : playTokensStore.read()
      const gamePlay = gamePlays.find(({ game }) => game.id === this.game.id)
      if (gamePlay) {
        try {
          await this.setPlayToken(gamePlay.id)
        } catch (error) {
          if (this.game.privacy === "PUBLIC") {
            await this.createPlayToken({ gameId: this.game.id })
          }
        }
      } else if (this.game.privacy === "PUBLIC") {
        await this.createPlayToken({ gameId: this.game.id })
      }
    }
  }

  savePlayToken(playToken) {
    super.ensureGameIsLoaded()

    if (this.user) {
      userStore.write({
        ...this.user,
        plays: [
          ...this.user.plays,
          { id: playToken, game: { id: this.game.id } }
        ]
      })
    } else {
      const gamePlays = playTokensStore.read()
      playTokensStore.write([
        ...gamePlays,
        { id: playToken, game: { id: this.game.id } }
      ])
    }
  }

  async setPlayToken(...args) {
    const playToken = await super.setPlayToken(...args)
    this.savePlayToken(playToken)
    return playToken
  }

  async createPlayToken(...args) {
    const playToken = await super.createPlayToken(...args)
    this.savePlayToken(playToken)
    return playToken
  }

  async loginUser(options) {
    const gamePlays = playTokensStore.read()
    const playTokens = gamePlays.map(({ id }) => id)
    const user = await super.loginUser({ ...options, playTokens })
    userStore.write(user)
    const userPlayTokens = user.plays.map(({ id }) => id)
    playTokensStore.write(
      gamePlays.filter(({ id }) => !userPlayTokens.includes(id))
    )
    return user
  }

  async registerUser(options) {
    const gamePlays = playTokensStore.read()
    const playTokens = gamePlays.map(({ id }) => id)
    const user = await super.registerUser({ ...options, playTokens })
    userStore.write(user)
    const userPlayTokens = user.plays.map(({ id }) => id)
    playTokensStore.write(
      gamePlays.filter(({ id }) => !userPlayTokens.includes(id))
    )
    return user
  }

  async getUser(...args) {
    const user = await super.getUser(...args)
    userStore.write(user)
    return user
  }

  async logoutUser(...args) {
    await super.logoutUser(...args)
    userStore.write(null)
    return null
  }
}

export default YGHPlayerWeb
