import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : 'http://localhost:8080'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/todos`)
      setTodos(res.data.todos)
    }
    fetch()
  }, [])

  const handleSubmit = async (event) => {
    const res = await axios.post(`${BACKEND_URL}/api/todos`, {
      todo: inputValue
    })
    setTodos(res.data.todos)
    setInputValue('')
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <img alt="Wonderful" src={`${BACKEND_URL}/api/image`} style={{ width: 500, height: 500}} />
      <div>
        <input value={inputValue} onChange={handleChange} maxLength={140} style={{ marginRight: 5 }} />
        <button onClick={handleSubmit}>Create TODO</button>
      </div>
      <ul>
        {todos.map(value => <li key={value.id}>{value.todo}</li>)}
      </ul>
    </>
  )
}

export default App;
