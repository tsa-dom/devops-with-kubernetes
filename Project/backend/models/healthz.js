const { pool } = require('../db.js')

const healthz = {
  checkHealthy: async () => {
    try {
      const res = await pool.query('SELECT NOW()')
      return res.rows
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

module.exports = { healthz }