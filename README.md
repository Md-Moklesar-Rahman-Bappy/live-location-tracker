# Live Location Tracker

A secure, consent-based real-time location sharing application built with React, TypeScript, Node.js, Socket.IO, PostgreSQL, and Prisma.

**Author:** Md Moklesar Rahman

---

## Features

### Authentication

- User Registration
- User Login
- User Logout
- Secure password hashing with Argon2id
- Server-side session management
- HttpOnly authentication cookies

### Live Location Sharing

- Create secure tracking sessions
- Generate viewer links
- Start sharing only after explicit consent
- Browser geolocation integration
- Real-time updates using Socket.IO
- GPS accuracy reporting
- Route history visualization
- Route polyline rendering
- Stop sharing instantly

### Viewer Access

- Public tracking links
- Session-specific access
- Live location updates
- Status monitoring
- Privacy-protected viewer experience

### Security

- Argon2 password hashing
- Token-based session access
- Share token hashing
- Rate limiting
- Input validation with Zod
- Type-safe API contracts
- Secure cookie handling

---

# Technology Stack

## Frontend

- React 18
- TypeScript
- Vite
- React Router
- React Leaflet
- Leaflet
- Socket.IO Client

## Backend

- Node.js
- Express
- TypeScript
- Socket.IO
- Prisma ORM

## Database

- PostgreSQL
- Prisma Migrate

## Tooling

- ESLint
- Prettier
- Vitest

---

# Project Structure

```text
live_location_tracker
│
├── apps
│   ├── server
│   └── web
│
├── packages
│   └── shared
│
├── prisma
│
├── docs
│
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Md-Moklesar-Rahman-Bappy/live-location-tracker.git

cd live-location-tracker
```

## Install Dependencies

```bash
npm install
```

---

# Environment Setup

Copy:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update values inside:

```env
DATABASE_URL=
SESSION_SECRET=
```

---

# Database Setup

## Start PostgreSQL

Using Docker Desktop:

```bash
docker compose up -d db
```

Check container:

```bash
docker compose ps
```

---

## Generate Prisma Client

```bash
npm run db:generate
```

---

## Run Migrations

```bash
npm run db:migrate
```

---

# Development

## Run Full Stack

```bash
npm run dev
```

---

## Frontend Only

```bash
npm run dev:web
```

---

## Backend Only

```bash
npm run dev:server
```

---

# Build

```bash
npm run build
```

---

# Quality Checks

## Type Checking

```bash
npm run typecheck
```

## Lint

```bash
npm run lint
```

## Security Audit

```bash
npm audit
```

---

# Live Location Workflow

## Owner

1. Register
2. Login
3. Create Session
4. Open Owner Share Page
5. Click "Start Sharing"
6. Grant Browser Location Permission
7. Share Viewer Link

---

## Viewer

1. Open Viewer Link
2. See Live Location Updates
3. View Route Path
4. See Session Status

---

# Privacy Notice

This application supports voluntary location sharing only.

Users must explicitly approve geolocation access through their browser.

The application:

- Does not track users secretly.
- Does not bypass browser permissions.
- Does not guarantee background tracking.
- Does not act as an emergency-response system.

Anyone possessing a valid viewer link may be able to see the shared location while the session remains active.

---

# Browser Limitations

Location sharing depends on browser support.

Background tracking may stop when:

- Browser tab is inactive
- Browser is minimized
- Mobile device is locked
- Battery optimization is enabled

---

# Local URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# Verified Status

Current project verification:

- npm audit ✅
- npm run lint ✅
- npm run typecheck ✅
- npm run build ✅

---

# Future Improvements

- Mobile Application
- Push Notifications
- Geofencing
- Multi-user Tracking
- Enhanced Session Analytics
- PostGIS Integration

---

# License

MIT License

---

# Repository

GitHub Repository:

[Live Location Tracker](https://github.com/Md-Moklesar-Rahman-Bappy/live-location-tracker)

---

# Author

**Md Moklesar Rahman**

Live Location Tracker Project