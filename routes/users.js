const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const config =require("config");

const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const { userModel, postModel } = require("../models/models")

const router = express.Router()

router.post("/users/signup" , ValidateSignup,  async (req,res,next) => {
  res.send("signed up successfully!")
})


function ValidateRequest(req,res,next,fields) {
  for (let field of fields)
    if (!req.body[field]) {
      res.send(`Please provide field "${field}"`)
      return false 
    }
  return true 
}

function ValidateSignup(req,res,next) {

  if (!ValidateRequest(req,res,next, ["username" , "email", "password", ])) return

  const { username, email, password } = req.body
  if (!(username.length >= 6)) {
    return res.send({error: "Please provide a username >= 6 characters in length"})
  }
  if (!email.match(emailValidationPattern)) {
   return res.send({error: "Please provide a valid email"})
  }

  if (!(password.length >= 8)) {
    return res.send({error: "Please provide a password >= 8 characters in length"})
  }

  next()
}





module.exports = router