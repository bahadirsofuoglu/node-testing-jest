const employeemodel = require('../model/employee')
const joi = require('@hapi/joi')

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
    if (joiCheck.error) {
      return res.status(400).json(joiCheck.error)
    }
    const newEmployee = await employeemodel.create(req.body)
    console.log(newEmployee)
    res.status(201).json(newEmployee)
    next()
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
