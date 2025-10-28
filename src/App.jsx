import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
  const theme = useSelector((state) => state.theme.mode)

  useEffect(() => {
    // Apply theme to document root using data attribute so CSS variables switch
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default App