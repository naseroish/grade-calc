// import { useState } from 'react'
import HomePage from './pages/HomePage'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router'
import Login from './pages/auth/login'


import './App.css'

function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={PrivateRoute()} >
          <Route path='' element={HomePage()} />
        </Route> */}
        <Route path='/home' element={HomePage()} />
        <Route path='/' element={Landing()} />
        <Route path='/login' element={Login()} /> 
      </Routes>
    </>
  )
}

export default App
