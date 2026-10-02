# Chicken Hat — Restaurant Management System

Arabic-first **full-stack restaurant ordering and management system** for a fried-chicken business. The project combines a customer storefront with operational tools for orders, menu items, reservations, users, and payments.

## Highlights

- Arabic RTL customer experience.
- Menu browsing, cart, checkout, and guest ordering.
- Table reservation workflow.
- Admin dashboard for menu, orders, and reservations.
- Role-based accounts for customers, staff, and administrators.
- Session-based authentication and password hashing.
- PostgreSQL data layer with Drizzle ORM.
- Stripe integration support for online payments.
- Responsive UI built with reusable Radix / shadcn components.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Radix UI, shadcn/ui, Wouter, TanStack Query, Zustand, React Hook Form, Zod.

**Backend:** Node.js, Express.js, TypeScript, PostgreSQL, Drizzle ORM, Express Sessions.

**Other:** Stripe, bcrypt, Neon PostgreSQL, Lucide React.

## Architecture

```text
Customer / Staff / Admin
          ↓
      React UI
          ↓
 REST API + Sessions
          ↓
 Express.js Backend
          ↓
 Drizzle ORM
          ↓
     PostgreSQL
```

The application separates client state from server state: Zustand handles persisted cart state, while TanStack Query manages API-backed data.

## Core Data Model

The system includes entities for:

- Users and roles
- Customer addresses
- Menu categories
- Menu items
- Orders and order items
- Reservations
- Payment and order status

## Local Development

```bash
npm install
npm run dev
```

Type-check the project with:

```bash
npm run check
```

Database schema changes can be pushed with:

```bash
npm run db:push
```

The project expects the required database and payment environment variables to be configured before running backend-dependent features.

## Purpose

This repository demonstrates building a real operational product rather than a static restaurant landing page: storefront UX, application state, authentication, database-backed workflows, administration, and payment integration are designed as one system.
