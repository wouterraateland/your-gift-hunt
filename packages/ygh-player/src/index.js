import React from 'react'
import { render, hydrate } from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { StoreProvider } from 'context/Store'
import App from 'components/App'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}

const store = {
	initialState: JSON.parse(window.localStorage.getItem('store')),
	enhancer: state => {
		window.localStorage.setItem('store', JSON.stringify(state))
		return state
	},
}

const Root = (
	<StoreProvider store={store}>
		<App />
	</StoreProvider>
)

const root = document.getElementById('root')

if (root.hasChildNodes()) {
	hydrate(Root, root)
} else {
	render(Root, root)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
