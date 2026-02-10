import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { MovieProvider } from './context/MovieContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
     
     
    </MovieProvider>
   
  </StrictMode>,
)
