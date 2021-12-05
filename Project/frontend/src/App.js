import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'

const App = () => {
  return (
    <Routes>
      <Route path="/healthz" element={<div>Healthy</div>} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  )
}

export default App;
