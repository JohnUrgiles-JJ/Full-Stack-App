const POOL = require('pg').Pool

const pool = new POOL({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
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

  
const createLinks = (request, response) => {
    const name = request.body.name
    const URL = request.body.URL


    pool.query('INSERT INTO links (name, URL) VALUES ($1, $2) RETURNING *', [name, URL], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    })
}
  
const updateLinks = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, URL } = request.body

    pool.query(
        'UPDATE links SET name = $1, URL = $2 WHERE id = $3', 
        [name, URL, id],
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
    createLinks,
    updateLinks,
    deleteLinks,
}