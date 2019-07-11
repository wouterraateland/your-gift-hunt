const { override, addWebpackAlias } = require("customize-cra")

const path = require("path")

module.exports = override(
  addWebpackAlias({
    react: path.resolve("./node_modules/react"),
    "react-dom": path.resolve("./node_modules/react-dom"),
    polished: path.resolve("./node_modules/polished"),
    "styled-components": path.resolve("./node_modules/styled-components")
  })
)
