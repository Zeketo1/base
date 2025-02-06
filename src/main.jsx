import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/style.css'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer className="z-[100]" />
    <RouterProvider router={AppRouter} />
  </StrictMode>,
)
