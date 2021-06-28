const express = require("express");
const { userModel, postModel } = require("../models/models")
const auth = require("../middlewear/auth_user")

const router = express.Router()


router.get("/posts", auth, async (req,res) => {
  res.send("posts")
})

router.post("/posts", auth, async (req,res) => {
  const text = req.body.text 
  let post = new postModel({text})
  post = await post.save()
  if (!post) return res.send({error: "There was an error"});
  const user = await userModel.findByIdAndUpdate(req._user._id, { $push : { posts: post._id } });
  res.send(post)
})


module.exports = router