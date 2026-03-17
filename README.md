# vuejs-cms

A minimal CMS built with a Vue.js 3 frontend and an Express/PostgreSQL backend. Supports public post listing, an admin CRUD interface, and JWT-based authentication.

## Tech stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Vue 3, TypeScript, Vite, Vue Router |
| Backend  | Node.js, Express, TypeScript        |
| Database | PostgreSQL (`pg`)                   |
| Auth     | JWT (env-based admin credentials)   |

## Features

- Public home page listing posts
- Admin panel to create, edit, and delete posts
- JWT-based admin authentication (no database user table)
- PostgreSQL for data persistence

---

## Installation

### Option A — Docker (recommended)

**Prerequisites:** Docker and Docker Compose.

```bash
# 1. Clone the repo
git clone <repo-url>
cd vuejs-cms

# 2. Configure backend credentials
cp server/.env.example server/.env
# Edit server/.env — set ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET

# 3. Build and start all services
docker compose up --build
```

The app will be available at [http://localhost](http://localhost).

Services started by compose:

| Service    | Description                  | Internal port |
|------------|------------------------------|---------------|
| `db`       | PostgreSQL 16                | 5432          |
| `backend`  | Express API                  | 5000          |
| `frontend` | Vue app served via nginx     | 80            |

To stop:

```bash
docker compose down
# To also remove the database volume:
docker compose down -v
```

---

### Option B — Local development

**Prerequisites:** Node.js ≥ 16, npm, PostgreSQL.

#### 1. Create the database

```bash
createdb vuejs_cms
# If you need to specify a user:
# createdb -U postgres vuejs_cms
```

Platform notes:
- **macOS:** `brew install postgresql && brew services start postgresql`
- **Windows:** Use the [EnterpriseDB installer](https://www.postgresql.org/download/windows/) or pgAdmin → right-click Databases → Create → Database → `vuejs_cms`

#### 2. Configure and start the backend

```bash
cd server
cp .env.example .env
# Edit .env — at minimum set DATABASE_URL
npm install
npm run dev        # live reload via tsx
```

The API listens on port `5000` by default.

#### 3. Start the frontend

From the repo root (separate terminal):

```bash
npm install
npm run dev
```

Vite starts at [http://localhost:5173](http://localhost:5173) and proxies `/api/*` to the backend on port `5000`.

---

## Environment variables

All backend config lives in `server/.env`. Copy `server/.env.example` to get started.

| Variable          | Default (dev)                              | Description                        |
|-------------------|--------------------------------------------|------------------------------------|
| `PORT`            | `5000`                                     | API server port                    |
| `DATABASE_URL`    | `postgresql://localhost:5432/vuejs_cms`    | PostgreSQL connection string       |
| `JWT_SECRET`      | `dev-secret`                               | Secret used to sign admin tokens   |
| `ADMIN_EMAIL`     | `test@test.nl`                             | Admin login email                  |
| `ADMIN_PASSWORD`  | `test123!`                                 | Admin login password               |

> In Docker, `DATABASE_URL` is automatically set to point at the `db` service — you do not need to change it.

---

## Usage

### Admin login

Visit `/login` in the browser. Use the credentials set in `server/.env` (defaults: `test@test.nl` / `test123!`).

How it works:
- `POST /api/auth/login` with `{ "email": "...", "password": "..." }` returns `{ "token": "<jwt>" }`.
- The frontend stores the token in `localStorage` and sends it as `Authorization: Bearer <token>` on all subsequent requests.
- Post create/update/delete endpoints require a valid token.

### API endpoints

| Method | Path                  | Auth required | Description          |
|--------|-----------------------|---------------|----------------------|
| GET    | `/api/posts`          | No            | List all posts       |
| GET    | `/api/posts/:id`      | No            | Get a single post    |
| POST   | `/api/posts`          | Yes           | Create a post        |
| PUT    | `/api/posts/:id`      | Yes           | Update a post        |
| DELETE | `/api/posts/:id`      | Yes           | Delete a post        |
| POST   | `/api/auth/login`     | No            | Obtain a JWT token   |

### Useful dev commands

```bash
# Backend
cd server
npm run dev        # Start with live reload
npm run build      # Compile TypeScript → dist/
npm start          # Run compiled output

# Frontend
npm run dev        # Start Vite dev server
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## Extending

Possible additions:
- User registration and a proper users table with hashed passwords
- Media/image upload support
- Role-based access control
- Additional content types (pages, categories)

Contributions are welcome.
