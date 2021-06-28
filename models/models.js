const mongoose = require("mongoose");
const postSchema = require("./postSchema")
const userSchema = require("./userSchema")


const postModel = mongoose.model("posts", postSchema);
const userModel = mongoose.model("users", userSchema);


module.exports = { postModel , userModel }