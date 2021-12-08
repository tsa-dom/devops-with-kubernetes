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

  const handleMarkDone = async (id) => {
    const { data } = await axios.put(`${BACKEND_URL}api/todos/${id}`)
    if (data) setTodos(todos.map(todo => {
      if (todo.id === id) return {
        ...todo,
        done: true
      } 
      else return todo
    }))
  }

  return (
    <>
      <div>Hello world</div>
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
            return <li key={value.id}>
              {value.todo}
              {!value.done && <button onClick={() => handleMarkDone(value.id)} style={{ marginLeft: 20, color: 'red' }} >Mark done</button>}
              {value.done && <span style={{ marginLeft: 20, color: 'green' }}>DONE</span>}
            </li>
          }
          return <li key={value.id}>
            <a href={url} target="_blank" rel="noreferrer">{value.todo}</a>
          </li>
        })}
      </ul>
    </>
  )
}

export default MainPage