# QWIZ ✌🏻

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


![Contributors](https://img.shields.io/github/contributors/qwiz-app/qwiz)
![Forks](https://img.shields.io/github/forks/qwiz-app/qwiz)
![Stars](https://img.shields.io/github/stars/qwiz-app/qwiz)
![Issues](https://img.shields.io/github/issues/qwiz-app/qwiz)

> Qwiz is a platform for creation, organization & discovery of pub quizzes.

<img src="./design.png" />

---
### [🎬 Video Demo (Google Drive)](https://drive.google.com/file/d/1swh3Bd43ThSkKgEnOpwXu9OcoUbOqt0l/view?usp=sharing)
### [🧰 Api Documentation (Postman)](https://documenter.getpostman.com/view/15639222/UyrDCvUG)

--- 

#### 🎤 Pitch deck
- [Final](https://pitch.com/public/3279f068-7a65-4838-8d7c-5c5906123cc0)
- [Initial](https://pitch.com/public/ce709700-e619-46a5-bbe3-afd0eb5570d6)


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
Start the frontend server
```bash
  npm run frontend
```
Start the backend server
```bash
  npm run backend
```

## Tech Stack

**Client:** Next.js, Typescript, Mantine, React Query, Zustand, Formik, Next Auth, Framer Motion

**Server:** Nest.js, PlanetScale (MySQL)

**API and Tools:** AWS SES, S3 and Lambda, Plausible Analytics, NX, Sentry, Uptime Kuma


## Environment Variables

To run this project, add the following environment variables to your .env.local file in apps/frontend dir

`NEXTAUTH_URL=http://localhost:4200`

`GITHUB_CLIENT_ID`

`GITHUB_CLIENT_SECRET`

`GOOGLE_CLIENT_SECRET`

`GOOGLE_CLIENT_SECRET`

`NEXT_PUBLIC_GOOGLE_MAPS_KEY`

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

`AWS_SES_REGION=`

`SMTP_USER=`

`SMTP_PASS=`

`SMTP_FROM=`

`PUPPETEER_SECRET= openssl rand -base64 32`

.env file in root dir (for Prisma)

`DATABASE_URL="DATABASE_URL="mysql://url"`

And .env file in apps/backend dir

`AWS_BUCKET_ACCESS_KEY=`

`AWS_BUCKET_SECRET_KEY=`

`AWS_BUCKET_NAME=`

`AWS_BUCKET_REGION=`

`AWS_BUCKET_URL=`

`PUPPETEER_SECRET= openssl rand -base64 32`

`FRONTEND_URL=http://localhost:4200`

