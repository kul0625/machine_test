# Multi-Level User Management System (MEAN)

This workspace contains **two separate repositories** as requested:

- `backend-repo` → Express + MongoDB + JWT + Cookie + CAPTCHA + hierarchy and balance APIs
- `frontend-repo` → Angular standalone client

## Why kept together here?
This coding environment gives one git repository. To publish as separate GitHub repos:
1. Create two GitHub repos.
2. Copy `backend-repo/*` to backend repo and `frontend-repo/*` to frontend repo.
3. Push each independently.

## Quick start
### Backend
```bash
cd backend-repo
cp .env.example .env
npm install
npm run seed:owner
npm run dev
```

### Frontend
```bash
cd frontend-repo
npm install
npm start
```

## Default owner credentials
- username: `owner`
- password: value of `OWNER_DEFAULT_PASSWORD` in `.env` (default `Owner@123`)

## API docs
- Postman collection: `backend-repo/docs/postman_collection.json`

## Implemented highlights
- JWT auth via HTTP-only cookies
- Session-linked CAPTCHA with 5-minute expiry
- N-level hierarchy with parent-child enforcement
- Balance transfer + ledger statement
- Admin hierarchy traversal and delegated credit (deduct from immediate parent)
- Commission tracking field
- Socket.IO event for live balance updates
