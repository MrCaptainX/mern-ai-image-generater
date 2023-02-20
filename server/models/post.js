const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const Post = mongoose.model("AiPost",PostSchema);

module.exports = Post;