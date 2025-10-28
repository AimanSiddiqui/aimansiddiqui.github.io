import React from 'react'
import ThemeToggle from '../features/theme/ThemeToggle'

export default function Layout({ children }) {
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'header',
      { className: 'header' },
      React.createElement('h1', null, 'Aiman Siddiqui'),
      React.createElement(
        'div',
        null,
        React.createElement(ThemeToggle)
      )
    ),
    React.createElement('main', null, children),
    React.createElement(
      'footer',
      {
        style: {
          marginTop: '3rem',
          color: 'var(--muted)',
          fontSize: '0.9rem'
        }
      },
      `© ${new Date().getFullYear()} Aiman Siddiqui — Built with React + Redux Toolkit`
    )
  )
}