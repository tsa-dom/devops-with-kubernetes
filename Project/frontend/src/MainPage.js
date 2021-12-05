import React, { useState, useEffect } from 'react'
import axios from 'axios'

//const BACKEND_URL = 'http://localhost:8080/'
const urlArray = window.location.href.toString().split('/')
const BACKEND_URL = `${urlArray[0]}//${urlArray[2]}/`

const MainPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${BACKEND_URL}api/todos`)
      setTodos(res.data.todos)
    }
    fetch()
  }, [])

  const handleSubmit = async (event) => {
    const { data } = await axios.post(`${BACKEND_URL}api/todos`, {
      todo: inputValue
    })
    if (!data.error) {
      setTodos(todos.concat(data.todo))
    }
    setInputValue('')
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <img alt="Wonderful" src={`${BACKEND_URL}api/image`} style={{ width: 500, height: 500}} />
      <div>
        <input value={inputValue} onChange={handleChange} maxLength={140} style={{ marginRight: 5 }} />
        <button onClick={handleSubmit}>Create TODO</button>
      </div>
      <ul>
        {todos.map(value => {
          let url
          try {
            url = new URL(value.todo)
          } catch (_) {
            return <li key={value.id}>{value.todo}</li>
          }
          return <li key={value.id}>
            <a href={url} target="_blank" rel="noreferrer">
              {value.todo}
            </a>
          </li>
        })}
      </ul>
    </>
  )
}

export default MainPage