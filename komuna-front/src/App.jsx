import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import LoginStore from './components/LoginStoreKG.jsx'
import Profile from './components/ProfilesKG.jsx'
import LoginTourist from './components/LoginTouristKG.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turist-store" element={<LoginTourist/>} />
        <Route path="/profile-store" element={<Profile/>} />
        <Route path="/login-store" element={<LoginStore/>} />
        <Route path="/register-store" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
