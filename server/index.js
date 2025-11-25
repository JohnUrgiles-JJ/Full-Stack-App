require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const db = require('./queries') // we can now reference objects in our queries file
const PORT = 3000

// Middleware
app.use(express.static(path.resolve(__dirname, '../client/dist')))

// Routes 
// request and respone
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

app.get('/test', (req, res)=> {

})

app.get('/links', db.getLinks)

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}.`)
})