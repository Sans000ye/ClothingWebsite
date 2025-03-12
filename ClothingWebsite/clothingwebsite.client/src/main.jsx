//Imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Filters from './Component/Filters/Filters'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Filters />
  </StrictMode>,
)
