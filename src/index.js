// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from 'store/configure'
import api from 'services/api'
import App from 'components/App'

const store = configureStore({}, { api: api.create() })

const renderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App')
    render(renderApp(), root)
  })
}
