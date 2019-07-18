const path = require("path")

module.exports = async ({ config }) => {
  config.resolve.alias["styled-components"] = path.resolve(
    "./node_modules/styled-components"
  )
  config.resolve.alias["polished"] = path.resolve("./node_modules/polished")

  return config
}
