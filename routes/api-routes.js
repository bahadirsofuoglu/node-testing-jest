let router = require('express').Router()
const controller = require('../controller/employee')
router.get('/', (req, res) => {
  res.json({
    status: 'API is working',
    message: 'Hello'
  })
})
router.post('/contacts', controller.createEmployee)
router.get('/contacts', controller.getAllEmployees)
router.get('/contacts/:employee_id', controller.getEmployeeById)
router.put('/contacts/:employee_id', controller.updateEmployeeById)
router.delete('/contacts/:employee_id', controller.deleteByEmployeeId)

router.post('/login', controller.loginEmployee)
module.exports = router
