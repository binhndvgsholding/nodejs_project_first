
const express = require('express')
const route = require('./scr/routes')
const morgan = require('morgan')   
var bodyParser = require('body-parser')     
const app = express()
const port = 3000  
route(app)
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const db =  require('./scr/config/db')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})