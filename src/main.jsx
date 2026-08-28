import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { BioceniaProvider } from './context/BioceniaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BioceniaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BioceniaProvider>
  </StrictMode>,
)
