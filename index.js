const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  })

  
app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.get('/users/create/:id/:name/:email', db.createUser)
app.get('/users/update/:id/:name/:email', db.updateUser)
app.get('/users/delete/:id', db.deleteUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})