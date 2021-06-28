const { lowerCase } = require("lodash");
const mongoose =require("mongoose");
const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const userSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, minlength: 6, maxlength: 255, trim: true },
  email: {type: String, lowercase: true, match: emailValidationPattern, maxlength: 255, trim: true },
  password: {type: String, maxlength: 512},
  posts: {type: [mongoose.SchemaTypes.ObjectId]}
})

module.exports = userSchema