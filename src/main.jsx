import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './common-styles/modern-normalize.css'
import './common-styles/styles.css'
import './common-styles/utils.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
