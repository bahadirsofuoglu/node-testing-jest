let express = require('express')
let port = 9000
let app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200)
})

app.listen(port, () => {
  console.log('connected', port)
})
