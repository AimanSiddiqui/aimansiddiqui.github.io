import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      Provider,
      { store },
      React.createElement(App)
    )
  )
)