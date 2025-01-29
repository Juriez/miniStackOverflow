const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Proxy Middleware for Microservices
app.use(
  '/user', // Route for User Service
  createProxyMiddleware({
    target: 'http://localhost:8001', // User Service URL
    changeOrigin: true,
    pathRewrite: { '^/user': '' }, // Remove /user prefix before forwarding
  })
);

app.use(
  '/post', // Route for Post Service
  createProxyMiddleware({
    target: 'http://localhost:8002', // Post Service URL
    changeOrigin: true,
    pathRewrite: { '^/post': '' }, // Remove /post prefix before forwarding
  })
);

app.use(
  '/notification', // Route for Notification Service
  createProxyMiddleware({
    target: 'http://localhost:8003', // Notification Service URL
    changeOrigin: true,
    pathRewrite: { '^/notification': '' }, // Remove /notification prefix before forwarding
  })
);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

// Start the API Gateway
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});