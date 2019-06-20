import "typeface-playfair-display"
import "typeface-montserrat"

import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import { ApolloProvider } from "react-apollo-hooks"

import ReactGA from "react-ga"

import client from "./apolloClient"

import App from "components/App"

ReactGA.initialize("UA-130420308-1")
ReactGA.pageview(window.location.pathname + window.location.search)

const root = document.getElementById("app-root")

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}

const render = Component =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    root
  )

render(App)

// if (module.hot) {
//   module.hot.accept("./components/App", () =>
//     render(require("./components/App").default)
//   )
// }

serviceWorker.unregister()
