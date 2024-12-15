import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QRCodeGenerator } from './QRCodeGenerator.jsx'
import './QRCodeGenerator.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QRCodeGenerator />
  </StrictMode>,
)