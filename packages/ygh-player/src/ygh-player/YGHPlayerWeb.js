import querystring from "querystring"
import YGHPlayer from "./YGHPlayer"
import playTokens from "./playTokens"

class YGHPlayerWeb extends YGHPlayer {
  async loadFromContext(gameIdentifier) {
    if (gameIdentifier) {
      await super.loadGame(gameIdentifier)
    } else {
      const pathParts = window.location.path.split("/").filter(s => s !== "")

      if (pathParts.length === 2) {
        await super.loadGame({
          creatorSlug: pathParts[0],
          gameSlug: pathParts[1]
        })
      } else {
        throw Error("Invalid context")
      }
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
      const playToken = playTokens.read(this.game.id)
      if (playToken) {
        try {
          await this.setPlayToken(playToken)
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
    playTokens.write(this.game.id, playToken)
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
}

export default YGHPlayerWeb
