const config = {
  aws: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretKey: process.env.AWS_BUCKET_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    bucketUrl: process.env.AWS_BUCKET_URL,
  },
};

export default config;
