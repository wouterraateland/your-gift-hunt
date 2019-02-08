import "typeface-playfair-display"
import "typeface-montserrat"

import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

import App from "components/App"
const root = document.getElementById("app-root")

const render = Component => ReactDOM.render(<Component />, root)

render(App)

if (module.hot) {
  module.hot.accept("./components/App", () =>
    render(require("./components/App").default)
  )
}

serviceWorker.unregister()
