import querystring from "querystring"
import YGHPlayer from "./YGHPlayer"
import playTokensStore from "./playTokensStore"
import userStore from "./userStore"

class YGHPlayerWeb extends YGHPlayer {
  gamePlays = []

  constructor(...args) {
    super(...args)
    super.setUser(userStore.read())
    this.gamePlays = this.user ? this.user.plays || [] : playTokensStore.read()
  }

  async loadGameFromContext(gameIdentifier) {
    if (gameIdentifier) {
      await super.loadGame(gameIdentifier)
    } else {
      throw Error("No game identifier")
    }

    const params = querystring.decode(window.location.search.substr(1))
    window.history.replaceState({}, "", window.location.pathname)

    if (params && params.playToken) {
      try {
        await this.setPlayToken(params.playToken)
      } catch (error) {
        if (this.game.privacy === "PUBLIC") {
          await this.createPlayToken({ gameId: this.game.id })
        }
      }
    }

    if (!this.playToken) {
      const gamePlay = this.gamePlays.find(
        ({ game }) => game.id === this.game.id
      )
      if (gamePlay && params.restart === undefined) {
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
      const plays = [
        { id: playToken, createdAt: new Date(), game: { id: this.game.id } },
        ...this.user.plays.filter(({ id }) => id !== playToken)
      ]
      userStore.write({
        ...this.user,
        plays
      })
      this.gamePlays = plays
    } else {
      const plays = [
        { id: playToken, createdAt: new Date(), game: { id: this.game.id } },
        ...this.gamePlays.filter(({ id }) => id !== playToken)
      ]
      playTokensStore.write(plays)
      this.gamePlays = plays
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
    if (user) {
      const userPlayTokens = user.plays.map(({ id }) => id)
      playTokensStore.write(
        gamePlays.filter(({ id }) => !userPlayTokens.includes(id))
      )
      this.gamePlays = user.plays
    }
    return user
  }

  async registerUser(options) {
    const gamePlays = playTokensStore.read()
    const playTokens = gamePlays.map(({ id }) => id)
    const user = await super.registerUser({ ...options, playTokens })
    userStore.write(user)
    if (user) {
      const userPlayTokens = user.plays.map(({ id }) => id)
      playTokensStore.write(
        gamePlays.filter(({ id }) => !userPlayTokens.includes(id))
      )
      this.gamePlays = user.plays
    }
    return user
  }

  async getUser(...args) {
    const user = await super.getUser(...args)
    userStore.write(user)
    if (user) {
      this.gamePlays = user.plays
    } else {
      this.gamePlays = playTokensStore.read()
    }
    return user
  }

  async logoutUser(...args) {
    await super.logoutUser(...args)
    userStore.write(null)
    this.gamePlays = playTokensStore.read()
    return null
  }

  async updateUserProfile(...args) {
    const user = await super.updateUserProfile(...args)
    userStore.write(user)
    return user
  }

  async updateUserPassword(...args) {
    const user = await super.updateUserPassword(...args)
    userStore.write(user)
    return user
  }
}

export default YGHPlayerWeb
