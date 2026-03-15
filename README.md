# Multi-Level User Management System (MEAN)

This workspace contains **two separate repositories** as requested:

- `backend-repo` → Express + MongoDB + JWT + Cookie + CAPTCHA + hierarchy and balance APIs
- `frontend-repo` → Angular standalone client

## Why kept together here?
This coding environment gives one git repository. To publish as separate GitHub repos:
1. Create two GitHub repos.
2. Copy `backend-repo/*` to backend repo and `frontend-repo/*` to frontend repo.
3. Push each independently.

## Prerequisite
- Node.js `22.18.0` (or any `22.x` >= 22.18.0) for local runs.

## Quick start (without Docker)
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

## Dockerized setup (recommended)

### (A) If you use your own MongoDB (Atlas/external)
Create a root `.env` file and set your URI:

```env
MONGO_URI=mongodb+srv://chandel:chandels@cluster0.gizrixl.mongodb.net/hierarchy_wallet?retryWrites=true&w=majority
JWT_SECRET=replace_with_long_secret
SESSION_SECRET=replace_with_session_secret
CLIENT_URL=http://localhost:4200
```

Then run:
```bash
docker compose up --build
```

### (B) If you want local MongoDB in Docker
Run with the `localdb` profile so Mongo container is started:

```bash
docker compose --profile localdb up --build
```
Services:
- Frontend: http://localhost:4200
- Backend API: http://localhost:4000/api
- MongoDB (only in `localdb` profile): `localhost:27017`

Useful Docker commands:
```bash
# run in background
docker compose up -d --build

# run in background with local mongo container
docker compose --profile localdb up -d --build

# view logs
docker compose logs -f

# stop
docker compose down

# stop and remove mongo volume
docker compose down -v
```

## Default owner credentials
- username: `owner`
- password: value of `OWNER_DEFAULT_PASSWORD` in `.env` / compose env (default `Owner@123`)

## Default admin credentials
- username: `admin`
- password: value of `ADMIN_DEFAULT_PASSWORD` in `.env` / compose env (default `Admin@123`)

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

## MongoDB help
If your MongoDB connection string is failing, check `backend-repo/README.md` section 
**MongoDB connection (if URI is not working)** for local, Docker, and Atlas options.