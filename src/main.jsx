import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserAuth from './UserAuth'
import Homepage from './Homepage'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<UserAuth />} />
        <Route path='home' element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
