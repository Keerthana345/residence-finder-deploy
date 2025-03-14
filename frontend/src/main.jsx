import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import LoginStore from './contexts/loginStore.jsx'

createRoot(document.getElementById('root')).render(
  <LoginStore>
    <App />
  </LoginStore>,
)
