import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import ResetPassword from './ResetPassword'
import Dashboard from './Dashboard'
import './index.css'

const path = window.location.pathname
const Page = path === '/login' ? Login : path === '/register' ? Register : path === '/profile' ? Profile : path === '/dashboard' ? Dashboard : path === '/reset-password' ? ResetPassword : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)

