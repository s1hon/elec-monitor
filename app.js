const express = require('express')

const app = express()
const http = require('http').Server(app)

const routes = require('./routes/index')
const apiV1 = require('./routes/api/v1')

app.use('/', routes)
app.use('/api/v1', apiV1)

// Templete engine
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  tags: {
    variableStart: '<$',
    variableEnd: '$>',
  },
  noCache: true,
  watch: true,
})

app.use(express.static('public'))

http.listen(8080, () => {
  console.log('listening on http://localhost:8080')
})
