# Personal Portfolio Website

## Overview

This is a personal portfolio website for Gaurav Basnyat, a Senior Solution Architect at Tucows. The application showcases professional experience, skills, reading interests, and includes a contact form. It features a modern, responsive design with smooth scrolling navigation and integrates with external services like Goodreads for book data.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and form management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with Express routes
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database
- **ORM**: Drizzle ORM for type-safe database operations
- **Migration Management**: Drizzle Kit for schema migrations
- **In-Memory Storage**: Fallback memory storage implementation for development

## Key Components

### Database Schema
- **Users Table**: Authentication and user management
- **Books Table**: Reading list with status tracking (read, currently-reading, to-read)
- **Contact Messages Table**: Form submissions from the contact section

### API Endpoints
- `GET /api/books/:status` - Fetch books by reading status
- `POST /api/books/sync` - Sync books from Goodreads RSS feed
- `POST /api/contact` - Submit contact form messages

### UI Sections
- **Hero Section**: Professional introduction and overview
- **Experience Section**: Timeline of work history and achievements
- **Skills Section**: Technical competencies and certifications
- **Reading Section**: Dynamic book display from Goodreads integration
- **Music Section**: Embedded Apple Music playlist
- **Contact Section**: Contact form with validation

## Data Flow

1. **Book Synchronization**: RSS feed from Goodreads is parsed and stored in the database
2. **Contact Form**: User submissions are validated and stored in the database
3. **Data Fetching**: React Query handles API calls with caching and error handling
4. **UI Updates**: Real-time updates through optimistic updates and query invalidation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon Database connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: UI component primitives
- **drizzle-orm**: Database ORM
- **wouter**: Client-side routing
- **zod**: Runtime type validation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast bundling for production

## Deployment Strategy

### Development
- Vite development server with HMR
- In-memory storage fallback for local development
- Replit-specific plugins for development environment

### Production
- Vite builds the client-side application
- ESBuild bundles the server code
- Static assets served from Express
- Database migrations handled by Drizzle Kit

### Environment Configuration
- `NODE_ENV` for environment detection
- `DATABASE_URL` for database connection
- Vite handles environment-specific builds

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
- July 04, 2025. Applied Kerem.co minimalist theme transformation - clean white background, light typography, card-based layouts
- July 04, 2025. Fixed profile photo path and updated hero section layout
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```