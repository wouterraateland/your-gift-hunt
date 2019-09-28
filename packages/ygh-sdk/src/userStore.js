const read = () =>
  typeof window === "undefined"
    ? null
    : JSON.parse(window.localStorage.getItem("ygh-player.user") || "null")

const write = user =>
  typeof window === "undefined"
    ? null
    : window.localStorage.setItem("ygh-player.user", JSON.stringify(user))

export default {
  read,
  write
}
