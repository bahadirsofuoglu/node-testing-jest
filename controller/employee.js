const employeeModel = require('../model/employee')
const joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const saltRounds = 10
const schema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .required()
    .email(),
  password: joi
    .string()
    .min(6)
    .max(12)
    .required(),
  gender: joi.string(),
  phone: joi.string()
})
exports.createEmployee = async (req, res, next) => {
  try {
    const joiCheck = await schema.validate(req.body)
    console.log('validation result', joiCheck)
    if (joiCheck.error) return res.status(400).json(joiCheck.error)
    const doEmailExist = await employeeModel.findOne({ email: req.body.email })
    console.log('doEmailExist:', doEmailExist)
    if (doEmailExist) {
      return res
        .status(400)
        .json('Email you provided already exist in our database')
    }
    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(encryptedPassword)
    req.body.password = encryptedPassword

    const newEmployee = await employeeModel.create(req.body)
    console.log(newEmployee)
    res.status(201).json(newEmployee)
    next()
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.getAllEmployees = async (req, res, next) => {
  try {
    const allEmployees = await employeeModel.find({})
    console.log(allEmployees)
    if (allEmployees && allEmployees.length > 0) {
      res.status(200).json(allEmployees)
    } else {
      res.status(404).json(err)
    }
  } catch (err) {
    console.log('in catch', err)
    res.status(500).json(err)
  }
}
exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.findById(req.params.employee_id)

    if (employee) {
      res.status(200).json(employee)
    } else {
      res.status(404).json(err)
    }
  } catch (err) {
    console.log('in catch', err)
    res.status(500).json(err)
  }
}
