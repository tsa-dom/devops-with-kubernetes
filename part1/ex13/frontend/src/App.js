import './App.css'
import React, { useState } from 'react'

const BACKEND_URL = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'http://localhost:8080'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('No should happen something')
    console.log('Lets create todo', inputValue)
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const todos = [
    "TODO 1",
    "TODO 2"
  ]

  return (
    <>
      <img alt="Wonderful" src={`${BACKEND_URL}/api/image`} style={{ width: 500, height: 500}} />
      <div>
        <input value={inputValue} onChange={handleChange} maxLength={140} style={{ marginRight: 5 }} />
        <button onClick={handleSubmit}>Create TODO</button>
      </div>
      <ul>
        {todos.map(todo => <li key={todo}>{todo}</li>)}
      </ul>
    </>
  )
}

export default App;
