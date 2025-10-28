import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from './themeSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const mode = useSelector((s) => s.theme.mode)

  return React.createElement(
    'button',
    {
      className: 'btn',
      onClick: () => dispatch(toggle()),
      'aria-label': `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`
    },
    mode === 'dark' ? 'Light' : 'Dark'
  )
}