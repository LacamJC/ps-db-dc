const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./src/routes/router')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const PORT = 3000

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Servidor na porta: ${PORT}`)
})