# Installation

This document describes how to set up the project locally for development (frontend + backend using PostgreSQL).

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

If you are running Postgres locally and want a simple database, create it with:

```bash
# create database (adjust user if necessary)
createdb vuejs_cms
```

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
