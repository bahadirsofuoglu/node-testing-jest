let mongoose = require('mongoose')

let contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 12
  },
  gender: {
    type: String
  },
  phone: {
    type: String
  },
  gender: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})
mongoose.pluralize(null)
const employeeModel = mongoose.model(
  'myemployee_test' + process.env.NODE_ENV,
  contactSchema
)
module.exports = employeeModel
