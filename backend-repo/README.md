# Backend Repository

## Stack
Node.js, Express, MongoDB, JWT (HTTP-only cookies), express-session CAPTCHA, Socket.IO.

## Run
```bash
npm install
cp .env.example .env
npm run seed:owner
npm run dev
```

## Core APIs
- `GET /api/auth/captcha`
- `POST /api/auth/login`
- `POST /api/auth/register` (auth required, creates only next-level user)
- `GET /api/users/next-level`
- `GET /api/users/downline/:userId?`
- `PATCH /api/users/:userId/password` (next-level only)
- `POST /api/balance/self-recharge` (owner)
- `POST /api/balance/transfer` (next-level credit)
- `GET /api/balance/statement`
- `GET /api/admin/hierarchy/:userId`
- `POST /api/admin/credit/:userId` (deduct immediate parent)
- `GET /api/admin/balance-summary`

## Security notes
- JWT stored in `auth_token` HTTP-only cookie
- CAPTCHA tied to `express-session`, expires in 5 minutes
- Auth middleware on all protected routes
