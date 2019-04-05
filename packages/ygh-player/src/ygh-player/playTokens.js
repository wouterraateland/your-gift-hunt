const load = () =>
  JSON.parse(window.localStorage.getItem("ygh-player.playTokens") || "{}")

const save = playTokens =>
  window.localStorage.setItem(
    "ygh-player.playTokens",
    JSON.stringify(playTokens)
  )

const read = gameId => load()[gameId]

const write = (gameId, playToken) => save({ ...load(), [gameId]: playToken })

export default {
  read,
  write
}
