const POOL = require('pg').Pool
require('dotenv').config()

const pool = new POOL({
    user: process.env.DB_USER,
    host: process.env.D_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT)
})

// request handlers for our express server

const getLinks = (req, res) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result)=>{
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

const getLinksById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const createLinks = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO links (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
        throw error
        }
        response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    })
}
  
const updateLinks = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE links SET name = $1, email = $2 WHERE id = $3', [name, email, id],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Link modified with ID: ${id}`)
        }
    )
}
  
const deleteLinks = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).send(`Link deleted with ID: ${id}`)
    })
}

module.exports = {
    getLinks,
    getLinksById,
    createLinks,
    updateLinks,
    deleteLinks,
}