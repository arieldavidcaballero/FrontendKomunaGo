import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turista" element={<div>Página de Turista</div>} />
        <Route path="/edit-store" element={<div>Editar Tienda</div>} />
        <Route path="/register-store" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
