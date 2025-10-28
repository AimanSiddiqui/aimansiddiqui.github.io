import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
  const theme = useSelector((state) => state.theme.mode)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return React.createElement(
    Layout,
    null,
    React.createElement(Home)
  )
}

export default App