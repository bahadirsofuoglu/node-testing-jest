const controller = require('../../controller/employee')
const model = require('../../model/employee')
const httpMock = require('node-mocks-http')
const mockEmployeeList = require('../mockdata/employees.json')
model.findByIdAndUpdate = jest.fn()
let req, res, next

beforeEach(() => {
  req = httpMock.createRequest()
  res = httpMock.createResponse()
  next = null
})
afterEach(() => {
  model.findByIdAndUpdate.mockClear()
})
describe('controller.updateEmployeeById', () => {
  test('updatedEmployeById function is defined', () => {
    expect(typeof controller.updateEmployeeById).toBe('function')
  })
  test('return an employee by id', async () => {
    let toUpdate = { ...mockEmployeeList[0], phone: '0123123' }
    req.params.employee_id = mockEmployeeList[0]._id
    req.body = { ...toUpdate }
    model.findByIdAndUpdate.mockReturnValue(toUpdate)
    await controller.updateEmployeeById(req, res, next)
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.employee_id,
      req.body,
      {
        userFindAndModify: false
      }
    )
    expect(res.statusCode).toBe(201)
    expect(res._getJSONData()).toStrictEqual(toUpdate)
  })
  test('return 4004 when id not found', async () => {
    model.findByIdAndUpdate.mockReturnValue(null)
    await controller.updateEmployeeById(req, res, next)
    expect(res.statusCode).toEqual(400)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getData()).toBeNull
  })
  test('return 500 when findByIdAndUpdate throw exception', async () => {
    model.findByIdAndUpdate.mockRejectedValue('fake error')
    await controller.updateEmployeeById(req, res, next)
    expect(res.statusCode).toEqual(500)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual('fake error')
  })
})
