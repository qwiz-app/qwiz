// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path((?!auth).*)*',
  //       destination: `${process.env.BACKEND_URL}/api/:path*`,
  //     },
  //   ];
  // },
};

module.exports = withNx(nextConfig);
