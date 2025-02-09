let express = require('express')
let port = 9000
let app = express()

const mongodb = require('./utils/mongodb.utils')
let apiRoutes = require('./routes/api-routes')

app.use(express.json())
app.use('/api', apiRoutes)
app.get('/', (req, res) => {
  res.status(200).json('hello')
})

mongodb.connect()
app.listen(port, () => {
  console.log('connected', port)
})
