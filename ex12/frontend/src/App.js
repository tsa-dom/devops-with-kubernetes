import './App.css'
import React from 'react'

const BACKEND_URL = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'http://localhost:8080'

const App = () => {

  return (
    <img alt="Wonderful" src={`${BACKEND_URL}/api/image`} style={{ width: 500, height: 500}} />
  )
}

export default App;
