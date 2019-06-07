const read = () =>
  JSON.parse(window.localStorage.getItem("ygh-player.playTokens") || "[]")

const write = playTokens =>
  window.localStorage.setItem(
    "ygh-player.playTokens",
    JSON.stringify(playTokens)
  )

export default {
  read,
  write
}
