import querystring from "querystring"
import YGHPlayer from "./"
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
      await this.setPlayToken(params.playToken)
      window.history.replaceState({}, "", window.location.path)
    }

    if (!this.playToken) {
      const playToken = playTokens.read(this.game.id)
      if (playToken) {
        await this.setPlayToken(playToken)
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
