import React from 'react'

export default function Home() {
  return React.createElement(
    'section',
    null,
    React.createElement(
      'div',
      { className: 'card' },
      React.createElement('h2', null, "Hello — I'm Aiman"),
      React.createElement(
        'p',
        { style: { color: 'var(--muted)' } },
        'This is a minimal portfolio scaffold. Add projects, about, and contact pages as needed.'
      )
    )
  )
}