import React from 'react'
import ThemeToggle from '../features/theme/ThemeToggle'

export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <h1>Aiman Siddiqui</h1>
        <div>
          <ThemeToggle />
        </div>
      </header>

      <main>{children}</main>
      <footer style={{ marginTop: '3rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Aiman Siddiqui — Built with React + Redux Toolkit
      </footer>
    </div>
  )
}