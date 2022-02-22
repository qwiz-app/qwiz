
# qwiz

## Installation and running locally

Clone the repo

```bash
  git clone https://github.com/qwiz-app/qwiz.git qwiz
  cd qwiz
```
Install compatable Node version and deps
```bash
  node -v #16.13.2
  npm i
```
Start the PostgreSQL docker container
```bash
  npm run db:start
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

`BACKEND_URL=http://localhost:3333`

`GITHUB_CLIENT_ID`

`GITHUB_CLIENT_SECRET`

`GOOGLE_CLIENT_SECRET`

`GOOGLE_CLIENT_SECRET`

`SECRET={any string}`

And to your .env file in root dir (for Prisma)

`DATABASE_URL="postgresql://postgres@localhost:5432/qwiz?schema=qwiz"`