const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const config =require("config");

const { userModel, postModel } = require("../models/models")

const router = express.Router()

router.post("/users/signup" , async (req,res,next) => {
  ValidateRequest(req,res,next, ["username" , "email", "password", ])
  res.send("Valid Request!")
})


function ValidateRequest(req,res,next, fields) {
  for (let field of fields)
    if (!req.body[field]) {
      res.send(`Please provide field ${field}`)
      next()
    }
}





module.exports = router