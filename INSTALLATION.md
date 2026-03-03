# Installation

This document describes how to set up the project locally for development (frontend + backend using PostgreSQL).
It also covers the simple admin authentication that ships with the project (JWT-based, default credentials).

## Prerequisites

- Node.js (>=16) and npm
- PostgreSQL (running locally or accessible via network)
- Optional: `psql` CLI for creating the database

## Backend (API)

1. Open a terminal and change to the server folder:

```bash
cd server
```

2. Copy the environment file and edit values:

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL (e.g. postgresql://user:pass@localhost:5432/vuejs_cms)
```

Optional environment variables you may want to set in `server/.env`:

- `PORT` — server port (default `5000`)
- `DATABASE_URL` — Postgres connection (e.g. `postgresql://user:pass@localhost:5432/vuejs_cms`)
- `JWT_SECRET` — secret used to sign admin JWTs (default `dev-secret` in development)
- `ADMIN_EMAIL` — optional override for default admin email (default `test@test.nl`)
- `ADMIN_PASSWORD` — optional override for default admin password (default `test123!`)

If you are running Postgres locally and want a simple database, create it with:

```bash
# create database (adjust user if necessary)
createdb vuejs_cms
```

Postgres tools and platform notes

- macOS:
	- Install via Homebrew: `brew install postgresql` or use Postgres.app.
	- Start the service with Homebrew: `brew services start postgresql`.
	- Create the DB: `createdb vuejs_cms` (or `createdb -U <user> vuejs_cms` to specify a user).

- Windows:
	- Install PostgreSQL with the official installer (EnterpriseDB) from https://www.postgresql.org/download/windows/ — it includes `psql` and `createdb`.
	- From the "SQL Shell (psql)" or a command prompt (with Postgres bin on PATH) run:

```
createdb -U postgres vuejs_cms
```

	- Or create a database via `pgAdmin`: right-click `Databases` → `Create` → `Database` and enter `vuejs_cms`.

- Tools overview:
	- Required: PostgreSQL server (provides `psql` and `createdb`).
	- Optional: `pgAdmin` (GUI) or Postgres.app (macOS) for easier local management.

3. Install dependencies and build/run:

Development (live reload):

```bash
npm install
npm run dev
```

Build and run compiled ESM output:

```bash
npm install
npm run build
npm start
```

The API will listen on the port defined in the `.env` (default `5000`) and exposes endpoints under `/api/posts`.

## Admin authentication (local dev)

This project includes a very small JWT-based admin auth for the admin UI. It does not create user records in the database — instead it checks credentials against the default credentials set in env vars.

Default credentials (development):

- Email: `test@test.nl`
- Password: `test123!`

How it works:

- POST `/api/auth/login` with JSON `{ "email": "...", "password": "..." }`.
- On success the API returns `{ "token": "<jwt>" }`.
- The frontend `Login` view stores the token in `localStorage` and sets the `Authorization: Bearer <token>` header on axios.
- Protected post routes (create/update/delete) require a valid JWT.

If you want to change the default credentials or the JWT secret for local dev, set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` in `server/.env`.

## Frontend (Client)

From the repository root:

```bash
npm install
npm run dev
```

Vite will start the frontend (default `localhost:5173`) and the project is configured to make API requests to `/api/posts`. While developing locally, you can run the backend concurrently so the frontend can proxy requests to it.

## Useful commands

- Start backend dev (server): `cd server && npm run dev`
- Build backend: `cd server && npm run build`
- Start backend (built): `cd server && npm start`
- Start frontend: `npm run dev`

## Notes

- The backend uses the `DATABASE_URL` environment variable (see `server/.env`).
- Ensure your Postgres user has permission to create/modify the `vuejs_cms` database or use a database URL with appropriate credentials.
- If you want example data, I can add a small seed script to insert sample posts.

## Quick start (summary)

1. Create DB (optional):

```bash
createdb vuejs_cms
```

2. Backend (server):

```bash
cd server
cp .env.example .env
# Edit .env and set DATABASE_URL (e.g. postgresql://user:pass@localhost:5432/vuejs_cms)
npm install
npm run dev
```

3. Frontend (root):

```bash
npm install
npm run dev
```

4. Open the app in the browser (Vite default `http://localhost:5173`).

5. Visit `/login` to sign in to the admin panel (use the default credentials, or the ones you set in `server/.env`).

