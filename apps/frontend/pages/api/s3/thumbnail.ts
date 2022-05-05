import AWS from 'aws-sdk';
import sha1 from 'sha1';
import config from 'lib/config';
import { getBrowserInstance } from 'lib/pupeteer';

const S3 = new AWS.S3({
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretKey,
  },
});

const handleThumbnailGeneration = async (req, res) => {
  const { url, size } = req.body;

  if (!url || !url.trim()) {
    res.json({
      status: 'error',
      error: 'Enter a valid URL',
    });

    return;
  }

  let browser = null;

  try {
    browser = await getBrowserInstance(size);
    const page = await browser.newPage();
    await page.goto(url);
    const imageBuffer = await page.screenshot();

    const salt = new Date().getTime();

    const fileName = sha1(`${salt}.jpg`);

    const params = {
      Bucket: config.aws.bucketName,
      Key: fileName,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    };

    // eslint-disable-next-line consistent-return
    S3.upload(params, (error, data) => {
      if (error) {
        return res.json({
          status: 'error',
          error: error.message || 'Something went wrong',
        });
      }
      res.json({
        status: 'ok',
        url: `${config.aws.bucketUrl}${fileName}`,
      });
    });

  } catch (error) {
    res.json({
      status: 'error',
      data: error.message || 'Something went wrong',
    });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

export default handleThumbnailGeneration;
