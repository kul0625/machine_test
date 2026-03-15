# Multi-Level User Management System (MEAN)

This workspace contains **two separate repositories** as requested:

- `backend-repo` → Express + MongoDB + JWT + Cookie + CAPTCHA + hierarchy and balance APIs
- `frontend-repo` → Angular standalone client

## Why kept together here?
This coding environment gives one git repository. To publish as separate GitHub repos:
1. Create two GitHub repos.
2. Copy `backend-repo/*` to backend repo and `frontend-repo/*` to frontend repo.
3. Push each independently.

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
Run the full stack with one command:

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:4200
- Backend API: http://localhost:4000/api
- MongoDB: `mongodb+srv://chandel:chandels@cluster0.gizrixl.mongodb.net/hierarchy_wallet?retryWrites=true&w=majority`

Useful Docker commands:
```bash
# run in background
docker compose up -d --build

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

## API docs
- Postman collection: `backend-repo/docs/postman_collection.json`

## Implemented highlights