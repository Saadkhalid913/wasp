const mongoose =require("mongoose");

const postSchema = new mongoose.Schema({
  text: {type:String, maxlength: 1024, trim: true},
  completed: {type: Boolean, default: false},
})

module.exports = postSchema