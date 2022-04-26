import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import appConfig from 'lib/config';
import { withSentry } from '@sentry/nextjs';

export const config = {
  api: {
    externalResolver: true,
  },
};

const proxy = (req: NextApiRequest, res: NextApiResponse) => {
  return httpProxyMiddleware(req, res, {
    target: appConfig.backendUrl,
    pathRewrite: {
      '^/api/': '/',
    },
  });
};

export default withSentry(proxy);
