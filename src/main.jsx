import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Always start fresh — clear all saved state on load
localStorage.removeItem('nurseProfile')
localStorage.removeItem('trackedJobs')
localStorage.removeItem('onboardingVariant')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
