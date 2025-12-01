const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
console.log('DB_PASSWORD:', process.env.DB_PASSWORD)
const express = require('express')
const app = express()
const db = require('./queries') // we can now reference objects in our queries file
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CRUD METHODS
app.post('/api/links', db.createLinks)
app.get('/api/links', db.getLinks)
app.put('/api/links/:id', db.updateLinks)
app.delete('/api/links/:id', db.deleteLinks)

// host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/dist')))

// Routes 
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

module.exports = app

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`The app is running on port ${PORT}.`)
    })
}