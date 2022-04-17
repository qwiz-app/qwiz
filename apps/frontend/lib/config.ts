const config = {
  backendUrl: process.env.BACKEND_URL,
  secret: process.env.SECRET,
  vercel: process.env.VERCEL_URL,
  nextAuth: {
    url: process.env.NEXTAUTH_URL,
    secret: process.env.NEXTAUTH_SECRET,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
  },
  plausible: {
    domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    url: process.env.NEXT_PUBLIC_PLAUSIBLE_URL,
    apiKey: process.env.NEXT_PUBLIC_PLAUSIBLE_API_KEY,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    publicDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
};

export default config;