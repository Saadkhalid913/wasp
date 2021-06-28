const config = require("config")
const jwt = require("jsonwebtoken")

module.exports = async function(req,res,next) {
  if (!req.body.user_auth_token) return res.send({error: "no token provided"})
  const token = req.body.user_auth_token
  try {
    const decoded = await jwt.verify(token, config.get("key"))
    req._user = decoded
    next()
  }
  catch(err) {
    return res.send({error: "invalid token"})
  }
}