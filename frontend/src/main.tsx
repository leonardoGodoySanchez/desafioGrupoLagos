import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PruebaApp } from './PruebaApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PruebaApp />
  </StrictMode>,
)
