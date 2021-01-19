const controller = require('../../controller/employee')
const model = require('../../model/employee')

describe('controller.getEmployeeById', () => {
  test('getEmployeeById function is defined', () => {
    expect(typeof controller.getEmployeeById).toBe('function')
  })
})
