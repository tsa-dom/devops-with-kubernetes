const { pool } = require('../db.js')

const todos = {
  getTodos: async () => {
    const res = await pool.query('SELECT * FROM TODOS;')
    return res.rows
  },
  addTodo: async (todo) => {
    await pool.query('INSERT INTO Todos (todo) VALUES ($1);', [todo])
  }
}

module.exports = { todos }