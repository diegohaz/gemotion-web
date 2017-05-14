// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { configure, addDecorator } from '@kadira/storybook'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import configureStore from 'store/configure'
import api from 'services/api'
import theme from 'components/theme'

const store = configureStore({}, { api: api.create() })
const req = require.context('components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </Provider>
))

configure(loadStories, module)
