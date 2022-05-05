import { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';

import envConfig from 'lib/config';

const s3 = new S3({
  region: envConfig.aws.region,
  accessKeyId: envConfig.aws.accessKeyId,
  secretAccessKey: envConfig.aws.secretKey,
  signatureVersion: 'v4',
});

// eslint-disable-next-line consistent-return
const fileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, type } = req.body;

    const fileParams = {
      Bucket: envConfig.aws.bucketName,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);

    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set desired value here
    },
  },
};

export default fileHandler;
