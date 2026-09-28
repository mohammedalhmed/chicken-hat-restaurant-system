# Overview

This is a comprehensive Arabic restaurant management system called "تشكن هات" (Chicken Hat) - a full-stack web application for a fried chicken restaurant. The system provides both customer-facing features (menu browsing, ordering, cart management, reservations) and admin management capabilities (orders, menu, reservations management). The application is built with React frontend, Express.js backend, PostgreSQL database with Drizzle ORM, and includes full order management and payment processing.

## Recent Updates (August 8, 2025)
- ✅ Added comprehensive database schema with real menu data
- ✅ Implemented complete cart functionality with Zustand persistence
- ✅ Created modular home page components (Hero, About, Menu, Reservations, Contact)
- ✅ Developed full admin dashboard with statistics and management tools
- ✅ Built complete order management system with status updates
- ✅ Implemented reservation system with form validation
- ✅ Added Arabic RTL support with custom CSS and color scheme
- ✅ Created responsive design with Tailwind CSS and custom animations

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for client-side routing (lightweight React router)
- **State Management**: 
  - Zustand with persistence for cart state
  - TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Arabic-first design with RTL (right-to-left) support
- **Styling**: Tailwind CSS with custom CSS variables for theming, Google Fonts (Cairo, Amiri)

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon serverless PostgreSQL with WebSocket support
- **API Design**: RESTful API with JSON responses
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot module replacement with Vite integration

## Database Schema
- **Users**: Customer accounts with roles (customer, admin, staff)
- **Addresses**: User delivery addresses with default selection
- **Categories**: Menu organization with Arabic and English names
- **Menu Items**: Restaurant items with pricing, descriptions, and images
- **Orders**: Order management with items, status tracking, and payment info
- **Reservations**: Table booking system with guest information
- **Order Items**: Junction table for order-menu item relationships

## Authentication & Authorization
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Customer, admin, and staff roles
- **Session-based Authentication**: Server-side session management
- **Guest Orders**: Support for orders without account creation

## Payment Integration
- **Payment Processor**: Stripe integration for online payments
- **Payment Methods**: Cash on delivery and online payment options
- **Payment Status**: Tracking for paid, unpaid, and refunded states

# External Dependencies

## Core Framework Dependencies
- **React**: Frontend framework with hooks and context
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Build tool and development server

## Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder and migration tool
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **PostgreSQL**: Primary database with advanced features

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI component primitives
- **Shadcn/ui**: Pre-built accessible components
- **Lucide React**: Icon library
- **Font Awesome**: Additional icons (via CDN)

## State Management & API
- **TanStack Query**: Server state synchronization and caching
- **Zustand**: Lightweight state management for cart
- **React Hook Form**: Form state and validation
- **Zod**: Schema validation library

## Payment & External Services
- **Stripe**: Payment processing (@stripe/stripe-js, @stripe/react-stripe-js)
- **Google Fonts**: Typography (Cairo, Amiri fonts)

## Development Tools
- **ESBuild**: Fast JavaScript bundler for production
- **TSX**: TypeScript execution for development
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Plugins**: Development environment integration

## Specialized Libraries
- **bcrypt**: Password hashing
- **connect-pg-simple**: PostgreSQL session store
- **date-fns**: Date manipulation utilities
- **class-variance-authority**: CSS variant management
- **cmdk**: Command palette component
- **Wouter**: Lightweight React router
