import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import appConfig from 'lib/config';

export const config = {
  api: {
    externalResolver: true,
  },
};

const proxy = (req: NextApiRequest, res: NextApiResponse) => {
  return httpProxyMiddleware(req, res, {
    target: appConfig.backendUrl,
  });
};

export default proxy;
