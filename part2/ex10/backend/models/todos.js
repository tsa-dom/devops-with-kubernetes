const { pool } = require('../db.js')

const todos = {
  getTodos: async () => {
    const res = await pool.query('SELECT * FROM TODOS;')
    return res.rows
  },
  addTodo: async (todo) => {
    const res = await pool.query('INSERT INTO Todos (todo) VALUES ($1) RETURNING *;', [todo])
    return res.rows[0]
  }
}

module.exports = { todos }