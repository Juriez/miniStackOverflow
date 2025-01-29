const Post = require('../models/Post');
const { minioClient, BUCKET_NAME } = require('../config/minio');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const crypto = require('crypto');
const express = require('express');
const axios = require('axios');  // Import axios for inter-service communication
const router = express.Router();

// Create post
router.post('/post', authMiddleware, upload.single('codeSnippet'), async (req, res) => {
  const { title, content, language } = req.body;
  let codeSnippetUrl = null;

  try {
    // Handle file upload
    if (req.file) {
      const objectName = `${crypto.randomBytes(16).toString('hex')}-${req.file.originalname}`;
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
      const fileExtension = extensionMap[language] || 'txt';
      const objectName = `${title}.${fileExtension}`;
      const buffer = Buffer.from(req.body.codeSnippet, 'utf-8');
      
      await minioClient.putObject(BUCKET_NAME, objectName, buffer);
      codeSnippetUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${objectName}`;
    }

    // Save post to the database
    const post = new Post({ 
      email: req.user.email, 
      title, 
      content, 
      codeSnippetUrl, 
      fileType: req.file ? 'file' : 'snippet',
      language: language || null
    });
    await post.save();

    // Notify NotificationService
    await axios.post(`http://${process.env.NOTIFICATION_SERVICE_HOST}:${process.env.NOTIFICATION_SERVICE_PORT}/notify`, {
      email: req.user.email,
      postId: post._id,
      message: `New post: ${title}`,
    });

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
