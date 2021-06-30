const express = require("express");
const { userModel, postModel } = require("../models/models")
const auth = require("../middlewear/auth_user")

const router = express.Router()


router.get("/posts", auth, async (req,res) => {
  const user = await userModel.findById(req._user._id);
  const posts = [...user.posts]
  return res.send(posts);
})

router.get("/posts/populate", auth,  async (req,res) => {
  const user = await userModel.findById(req._user._id);
  const posts = [...user.posts]
  const result = await posts.map(async p => await postModel.findById(p))
  Promise.all(result).then(r => res.send(r))
  
})

router.post("/posts", auth, async (req,res) => {
  const text = req.body.text 
  let post = new postModel({text})
  post = await post.save()
  if (!post) return res.send({error: "There was an error"});
  const user = await userModel.findByIdAndUpdate(req._user._id, { $push : { posts: post._id } });
  res.send(post)
})

router.put("/posts/toggle/:id", auth, async (req,res) => {
  const id = req.params.id
  const user = await userModel.findById(req._user._id);
  if (!user.posts.includes(id)) return res.send({error: "you are unauthorized"})
  const post = await postModel.findById(id);
  post.completed = !post.completed
  const result = await post.save();
  return res.send(result)
})


router.delete("/posts/:id", auth, async (req,res) => {
  const response = await postModel.findByIdAndDelete(req.params.id);
  const user = await userModel.findById(req._user._id);
  const index = user.posts.findIndex(p => p._id === response._id);
  user.posts.splice(index, 1);
  await user.save()
  res.send(response)
})


module.exports = router