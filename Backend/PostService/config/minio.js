const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: "minio",
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;



module.exports = { minioClient, BUCKET_NAME };