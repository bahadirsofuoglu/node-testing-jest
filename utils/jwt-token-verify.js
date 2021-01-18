const jwt = require('jsonwebtoken')

const verifytoken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    res.status(400).json('Token Not provided in auth-token header')
    try {
      const jwtTokenVerify = jwt.verify(token, process.env.JWT_TOKEN_KEY)
      req.user(jwtTokenVerify)
    } catch (err) {
      res
        .status(400)
        .json('remeber we have security in place, go away, wrong token')
    }
    next()
  }
}

module.exports = { verifytoken }
