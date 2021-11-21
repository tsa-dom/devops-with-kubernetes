const { Pool } = require('pg')
const fs = require('fs')

const pool = new Pool()

fs.readFile('schema.sql', async (err, data) => {
  if (!err) {
    const query = data.toString()
    await pool.query(query)
  }
})

module.exports = { pool }