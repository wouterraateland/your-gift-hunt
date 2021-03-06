const read = () => {
  if (typeof window === "undefined") {
    return []
  }

  const value = JSON.parse(
    window.localStorage.getItem("ygh-player.playTokens") || "[]"
  )
  if (!Array.isArray(value)) {
    window.localStorage.setItem("ygh-player.playTokens", JSON.stringify([]))
    return []
  }
  return value
}

const write = playTokens =>
  typeof window === "undefined"
    ? null
    : window.localStorage.setItem(
        "ygh-player.playTokens",
        JSON.stringify(playTokens)
      )

export default {
  read,
  write
}
