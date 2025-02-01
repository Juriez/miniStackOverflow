const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { minioClient, BUCKET_NAME } = require('../config/minio');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const crypto = require('crypto');
const { publishEvent } = require('../config/eventPublisher'); // Import event publisher

// Create post
router.post('/', authMiddleware, upload.single('codeSnippet'), async (req, res) => {
  console.log("hererererere")
  const { title, content, language } = req.body;
  let codeSnippetUrl = null;
  console.log(process.env.MINIO_ENDPOINT);
  // Handle file upload
  if (req.file) {
    
    const objectName = `${crypto.randomBytes(16).toString('hex')}-${req.file.originalname}`;
    // console.log(req.file)
    await minioClient.putObject(BUCKET_NAME, objectName, req.file.buffer);
    codeSnippetUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${objectName}`;
  } 
  // Handle pasted code snippet
  else if (req.body.codeSnippet && language) {
    const extensionMap = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      csharp: 'cs',
      ruby: 'rb',
      go: 'go',
      php: 'php',
      html: 'html',
      css: 'css',
      swift: 'swift',
      kotlin: 'kt',
      rust: 'rs',
      typescript: 'ts',
    };
    console.log(process.env.MINIO_ENDPOINT);
    const fileExtension = extensionMap[language] || 'txt'; // Default to .txt if language not found
    const objectName = `${title}.${fileExtension}`; // Use title as filename
    const buffer = Buffer.from(req.body.codeSnippet, 'utf-8');

    await minioClient.putObject(BUCKET_NAME, objectName, buffer);
    codeSnippetUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${objectName}`;
  }

  const post = new Post({ 
    email: req.user.email, 
    title, 
    content, 
    codeSnippetUrl, 
    fileType: req.file ? 'file' : 'snippet',
    language: language || null
  });
  await post.save();

  // Publish an event instead of directly creating a notification
  await publishEvent('postCreated', { email: req.user.email, postId: post._id, title });

  res.status(201).json({ message: 'Post created successfully' });
});

// Get posts of others
router.get('/', authMiddleware, async (req, res) => {
  const posts = await Post.find({ email: { $ne: req.user.email } }).sort({ createdAt: -1 });
  res.json(posts);
});

// Get own posts
router.get('/mypost', authMiddleware, async (req, res) => {
  const posts = await Post.find({ email: req.user.email }).sort({ createdAt: -1 });
  res.json(posts);
});

// Get single user post
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route in postRoute.js
router.get('/code/:objectName', authMiddleware, async (req, res) => {
  const { objectName } = req.params;

  try {
    const stream = await minioClient.getObject(BUCKET_NAME, objectName);
    res.setHeader('Content-Type', 'text/plain'); // Set the content type to plain text
    stream.pipe(res); // Pipe the stream directly to the response
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the code snippet' });
  }
});

module.exports = router;