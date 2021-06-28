const mongoose = require("mongoose");
const postSchema = require("./postSchema")
const userSchema = require("./userSchema")


const postModel = mongoose.model("posts", postModel);
const userModel = mongoose.model("users", userModel);


module.exports = { postModel , userModel }