const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy routes
app.use('/user', createProxyMiddleware({ target: 'http://localhost:8001', changeOrigin: true }));
app.use('/post', createProxyMiddleware({ target: 'http://localhost:8002', changeOrigin: true }));
app.use('/notification', createProxyMiddleware({ target: 'http://localhost:8003', changeOrigin: true }));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});