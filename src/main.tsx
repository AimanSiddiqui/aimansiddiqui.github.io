import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Always open on the hero. The browser would otherwise restore the old scroll
// position on reload, visibly gliding down (smooth scrolling) while the page
// builds, and the sticker intro only plays from the top.
if (!location.hash) {
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
