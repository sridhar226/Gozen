# Gozen - Full-Stack TypeScript Project

This project demonstrate a complete full-stack TypeScript environment with a React frontend and an Express backend.

## Structure

- `/frontend`: React + Vite + TypeScript
- `/backend`: Node.js + Express + TypeScript

## Getting Started

### Backend
1. `cd backend`
2. `npm install` (already done)
3. `npm run dev` to start the server with nodemon

### Frontend
1. `cd frontend`
2. `npm install` (already done)
3. `npm run dev` to start the Vite development server

## Features Implemented

### Frontend
- **useLocalStorage Hook**: Type-safe storage synchronization.
- **useDebounce Hook**: Value debouncing for performance optimization.
- **Polymorphic Button Component**: Robust, reusable UI component with variant and size support.

### Backend
- **Role-Based Access Control (RBAC)**: Type-safe middleware using Express declaration merging.
- **Protected Routes**:
  - `GET /profile`: Requires authentication.
  - `POST /content`: Requires Admin/Editor.
  - `DELETE /system`: Requires Admin.
