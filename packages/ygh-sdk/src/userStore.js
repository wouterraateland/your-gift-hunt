const read = () =>
  JSON.parse(window.localStorage.getItem("ygh-player.user") || "null")

const write = user =>
  window.localStorage.setItem("ygh-player.user", JSON.stringify(user))

export default {
  read,
  write
}
