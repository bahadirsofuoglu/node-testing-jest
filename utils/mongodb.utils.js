require('dotenv').config()
const mongoose = require('mongoose')
const URL = process.env.DB_URL

const connect = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connected db')
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const disconnect = () => {
  try {
    mongoose.disconnect(URL)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const dropCollection = async collectionName => {
  try {
    mongoose.connection.collection(collectionName).drop()
  } catch (err) {
    if (err.code === 26) {
      console.log('namespace %s not found', collectionName)
    } else {
      throw new Error(err)
    }
  }
}
module.exports = { connect, disconnect, dropCollection }
