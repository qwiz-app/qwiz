# QWIZ

App for building pub quizzes

### 👀️
<img src="https://user-images.githubusercontent.com/46557266/164997986-62e99ca8-4211-4ceb-8b01-a36541a7040a.png" />

## Installation and running locally

Clone the repo

```bash
  git clone https://github.com/mislavjc/qwiz.git qwiz
  cd qwiz
```
Install compatable Node version and deps
```bash
  node -v #16.13.2
  npm i
```
Start the frontend server
```bash
  npm run frontend
```
Start the backend server
```bash
  npm run backend
```

## Environment Variables

To run this project, add the following environment variables to your .env.local file in apps/frontend dir

`NEXTAUTH_URL=http://localhost:4200`

`GITHUB_CLIENT_ID`

`GITHUB_CLIENT_SECRET`

`GOOGLE_CLIENT_SECRET`

`GOOGLE_CLIENT_SECRET`

`SECRET={openssl rand -base64 32}`

`NEXTAUTH_SECRET={openssl rand -base64 32}`

`NEXT_PUBLIC_PLAUSIBLE_DOMAIN={domain url without protocol}`

`NEXT_PUBLIC_PLAUSIBLE_URL={domain url}`

`NEXT_PUBLIC_PLAUSIBLE_API_KEY=`

`SENTRY_DSN=`

`NEXT_PUBLIC_SENTRY_DSN=`

`SENTRY_IGNORE_API_RESOLUTION_ERROR=1` 

`NEXT_PUBLIC_AWS_BUCKET_URL=`
`AWS_IMG_ROOT={bucket url without protocol}`

.env file in root dir (for Prisma)

`DATABASE_URL="DATABASE_URL="mysql://url"`

And .env file in apps/backend dir

`AWS_BUCKET_ACCESS_KEY=`

`AWS_BUCKET_SECRET_KEY=`

`AWS_BUCKET_NAME=`

`AWS_BUCKET_REGION=`

`AWS_BUCKET_URL=`