const { pool } = require('../db.js')

const todos = {
  getTodos: async () => {
    const res = await pool.query('SELECT * FROM TODOS;')
    return res.rows
  },
  addTodo: async (todo) => {
    const res = await pool.query('INSERT INTO Todos (todo, done) VALUES ($1, FALSE) RETURNING *;', [todo])
    return res.rows[0]
  },
  setTodoAsDone: async (id) => {
    try {
      await pool.query('UPDATE Todos SET done=TRUE WHERE id=$1;', [id])
      return true
    } catch (err) {
      return false
    }
  }
}

module.exports = { todos }