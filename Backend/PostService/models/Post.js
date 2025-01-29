const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  codeSnippetUrl: { type: String }, 
  fileType: { type: String }, 
  language: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);