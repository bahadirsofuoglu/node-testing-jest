const controller = require('../../controller/employee')
const model = require('../../model/employee')
const httpMock = require('node-mocks-http')
const mockEmployeeList = require('../mockdata/employees.json')
model.findByIdAndDelete = jest.fn()
let req, res, next

beforeEach(() => {
  model.findByIdAndDelete.mockClear()
  req = httpMock.createRequest()
  req.params.employee_id = '123'
  res = httpMock.createResponse()
  next = null
})

describe('controller.deleteEmployeeById', () => {
  test('deleteEmployeeById function is defined', () => {
    expect(typeof controller.deleteByEmployeeId).toBe('function')
  })
  test('delete a valid employee', async () => {
    model.findByIdAndDelete.mockResolvedValue(mockEmployeeList[0])
    await controller.deleteByEmployeeId(req, res, next)
    expect(model.findByIdAndDelete).toBeCalledWith('123')
    expect(res.statusCode).toEqual(201)
    expect(res._getJSONData()).toStrictEqual(mockEmployeeList[0])
  })
  test('return 404 when to be deketed not present in db', async () => {
    model.findByIdAndDelete.mockResolvedValue(null)
    await controller.deleteByEmployeeId(req, res, next)
    expect(model.findByIdAndDelete).toBeCalledWith('123')
    expect(res.statusCode).toBe(404)
    expect(res._getJSONData()).toStrictEqual('User Not Found')
  })
  test('return 500 when model.findByIdAndDelete throw exception', async () => {
    model.findByIdAndDelete.mockRejectedValue(
      'fake exception from mongoose finByIdAndDelete'
    )
    await controller.deleteByEmployeeId(req, res, next)
    expect(res.statusCode).toBe(500)
    expect(model.findByIdAndDelete).toBeCalledWith('123')
    expect(res._getData()).toStrictEqual(
      'fake exception from mongoose finByIdAndDelete'
    )
  })
})
