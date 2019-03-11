import "typeface-playfair-display"
import "typeface-montserrat"

import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"

import App from "components/App"

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo-hooks"

const root = document.getElementById("app-root")

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React)
}

const client = new ApolloClient({
  uri: "https://hunt-api-e7bdecad20.herokuapp.com/hunt-api/dev"
})

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
