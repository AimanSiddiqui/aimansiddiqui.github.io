import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch (e) {
    // ignore
  }
  // prefer system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialTheme() },
  reducers: {
    toggle(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', state.mode)
      } catch (e) {
        // ignore
      }
    },
    setTheme(state, action) {
      if (action.payload === 'dark' || action.payload === 'light') {
        state.mode = action.payload
        try {
          localStorage.setItem('theme', state.mode)
        } catch (e) {}
      }
    },
  },
})

export const { toggle, setTheme } = themeSlice.actions
export default themeSlice.reducer