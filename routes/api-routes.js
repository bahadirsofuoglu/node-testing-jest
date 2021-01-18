let router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    status: 'API is working',
    message: 'Hello'
  })
})

module.exports = router
