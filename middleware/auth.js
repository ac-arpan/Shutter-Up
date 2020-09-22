const config = require("config")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

const User = require('../models/User')

function auth(req, res, next) {
  
  // Get the token from request header
  const { authorization } = req.headers

  // Check for token
  if (!authorization) return res.status(401).json({ msg: "No Token, authorization denied" })


  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, config.get('jwtSecret'), (err, payload) => {
      if(err) {
        return res.status(401).json({ msg: "No Token, authorization denied" })
      }
      const { _id } = payload

      User.findById(_id)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))

  })

  
}
module.exports = auth

