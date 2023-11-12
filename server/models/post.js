const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  textContent: String,
  mediaHref: String,
  postLink: { type: String, unique: true },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
