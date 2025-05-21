import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

// Add console log for debugging
console.log('Mounting React app...')
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
