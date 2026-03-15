# Frontend Repository (Angular)

## Features
- Login form with CAPTCHA
- Dashboard with current user + statement
- Next-level user creation
- Transfer balance to next-level users
- Route guard for protected pages

## Prerequisite
- Node.js `22.18.0` (or any `22.x` >= 22.18.0).

## Run (local)
```bash
npm install
npm start
```

Backend expected at `http://localhost:4000`.

## Run with Docker
From workspace root:

```bash
docker compose up --build
```

Frontend will be available on `http://localhost:4200`.

Docker builder image uses `node:22.18.0-alpine`.