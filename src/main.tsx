import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'


const div = document.getElementById('root') as HTMLElement;

createRoot(div).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


