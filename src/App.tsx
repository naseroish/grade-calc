// import { useState } from 'react'
import HomePage from './pages/HomePage'
import Landing from './pages/Landing'
import { Route, Routes, Navigate } from 'react-router'
import Login from './pages/auth/login'
import { useAuth } from './services/authService'

import './App.css'

function App() {
  const session = useAuth()


  return (
    <>
      <Routes>
        <Route path="/home" element={session ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/' element={!session ? <Landing /> : <Navigate to="/home" />} />
        <Route path='/login' element={Login()} /> 
      </Routes>
    </>
  )
}

export default App
