# Backend Repository

## Stack
Node.js, Express, MongoDB, JWT (HTTP-only cookies), express-session CAPTCHA, Socket.IO.
## Prerequisite
- Node.js `22.18.0` (or any `22.x` >= 22.18.0).
## Run (local)
```bash
npm install
cp .env.example .env
npm run seed:owner
npm run dev
```

## Run with Docker
From the workspace root:

```bash
docker compose up --build
```

Backend runs at `http://localhost:4000` and automatically seeds owner user on startup if missing.

## MongoDB connection (if URI is not working)
Set `MONGO_URI` in `.env`.```

### MongoDB Atlas
Use a URI like:
```env
MONGO_URI=mongodb+srv://chandel:chandels@cluster0.gizrixl.mongodb.net/hierarchy_wallet?retryWrites=true&w=majority
```
Important checks:
- URL-encode special characters in password (`@`, `#`, `%`, etc.).
- In Atlas Network Access, add your machine IP (or temporary `0.0.0.0/0` for testing).
- In Atlas Database Access, ensure user has read/write permission.

### Quick diagnostics
```bash
# verify env value is loaded
echo $MONGO_URI

# test DNS for Atlas host (replace host)
nslookup <cluster-url>
```
If backend prints `MongoDB connected`, URI is valid.

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