# HireSphere

HireSphere is a responsive job portal built with React, Vite, Express, MongoDB, React Router, and Lucide icons. The MVP backend provides job listings, account registration and sign-in, and user-specific saved jobs. Job applications and employer job management remain future work.

## Run locally

Requirements: Node.js 20.19+ or 22.12+, npm, and MongoDB (local or hosted).

```bash
npm install
cp .env.example .env
```

Set `MONGODB_URI` in `.env` to your MongoDB connection string and replace `JWT_SECRET` with a random secret of at least 32 characters. Start MongoDB, then seed the sample job listings:

```bash
npm run seed
```

In separate terminals, start the API and frontend:

```bash
npm run dev:api
npm run dev
```

The frontend is served by Vite and proxies `/api` requests to `http://localhost:4000`. To run the production API use `npm run start:api`.

To validate the project:

```bash
npm run lint
npm run build
npm run preview
```

## Backend API

- `GET /api/health` — API and database readiness
- `GET /api/jobs` and `GET /api/jobs/:jobId` — search and read job listings
- `POST /api/auth/register` and `POST /api/auth/login` — create an account or start a session
- `GET /api/auth/me` — read the authenticated user
- `GET /api/saved-jobs`, `PUT /api/saved-jobs/:jobId`, and `DELETE /api/saved-jobs/:jobId` — manage the signed-in user's saved roles

The frontend sends bearer tokens to the API. For a separately hosted frontend, set `FRONTEND_URL` on the API to its exact origin and build the frontend with `VITE_API_URL` set to the API's public base URL (for example, `https://api.example.com/api`). Keep `JWT_SECRET` private and use a managed MongoDB instance with network access restricted to the API in production.

## Deploy (Vercel + Render + MongoDB Atlas)

This project can be deployed as a static Vite frontend on Vercel, an Express API on Render, and a MongoDB database on Atlas.

1. Push the project to a GitHub repository. Do not commit `.env`; it contains secrets.
2. Create an Atlas cluster and database user. Copy the application connection string and set its database to `hiresphere`. Configure Atlas network access for the API host; avoid unrestricted access where your host supports fixed outbound IPs.
3. In Render, create a **Web Service** from the repository. Use the repository root, Node runtime, build command `npm install`, and start command `npm run start:api`. Add these environment variables:
   - `MONGODB_URI` — the Atlas connection string
   - `JWT_SECRET` — a securely generated random secret of at least 32 characters
   - `FRONTEND_URL` — the exact deployed Vercel origin, with no trailing slash
   Render supplies `PORT`; the API uses it automatically. After deployment, seed the database once with `npm run seed` in Render's Shell, or run that command locally with the production `MONGODB_URI` set in your uncommitted `.env`.
4. In Vercel, import the same repository. Select Vite (or leave framework detection on), use build command `npm run build`, and output directory `dist`. Set the environment variable `VITE_API_URL` to `https://<your-render-service>.onrender.com/api`, then deploy.
5. Set Render's `FRONTEND_URL` to the final Vercel deployment origin (or your custom domain) and redeploy the API if needed. Verify `https://<your-render-service>.onrender.com/api/health` returns `{"status":"ok"}` and then test jobs, registration, login, and saving a role on the frontend.

For Vercel preview deployments, the API CORS origin must also match the preview origin; the production Vercel domain is the simplest initial setup.

## Pages in this stage

- `/` — landing page with job search, featured roles, categories, and employer call to action
- `/jobs` — searchable, filterable, sortable job listings from MongoDB
- `/jobs/:jobId` — job details and a preview apply action
- `/login` and `/register` — account registration and sign-in
- `/dashboard` — sample job-seeker dashboard
- `/saved` — saved roles, stored per account or in browser local storage for anonymous visitors

Job-board search, category and role filters, sorting, load-more, and job details use API data. Saved jobs for signed-in users are stored in MongoDB; anonymous saved roles remain in browser local storage. Dashboard statistics, profile content, and applications remain sample preview content and do not submit applications.

## Structure

```text
src/
  components/    Shared navigation, cards, search, footer, and status badge
  context/       Saved-job state and hook
  data/          Sample job listings and categories
  pages/          Landing, job board/details, auth, dashboard, not-found
  App.jsx         Client-side routes and shared layout
  App.css         Responsive application styles
  index.css       Global tokens and baseline styles
```

## Future implementation stages

Next stages include seeker profiles and applications, employer job publishing and applicant management, end-to-end tests, and production deployment hardening. The current backend is an MVP and should not be treated as a finished production job platform.

## Screenshots

Add screenshots after reviewing the running application.
