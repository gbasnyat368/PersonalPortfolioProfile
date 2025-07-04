# Deployment Guide

## Issues and Solutions

### Problem
The deployment failed with this error:
```
Build creates a Node.js server bundle in dist/index.js instead of static HTML files
Public directory (dist) does not contain index.html for static deployment
Application is designed as a full-stack Express app, not a static site
```

### Root Cause
The application is configured for static deployment, but it's actually a full-stack Express application with:
- API routes (`/api/*`)
- Server-side rendering setup
- Database connections
- Backend logic

### Solution

#### 1. Change Deployment Type
In the Replit deployment interface, change these settings:
- **Deployment Target**: `autoscale` (not `static`)
- **Build Command**: `npm run build` ✓ (already correct)
- **Run Command**: `npm start` (add this)
- **Public Directory**: `dist/public` (change from `dist`)

#### 2. Required .replit Configuration
```
[deployment]
deploymentTarget = "autoscale"
build = ["npm", "run", "build"]
run = ["npm", "start"]
publicDir = "dist/public"
```

#### 3. Verify Build Output
The build process creates:
- `dist/index.js` - Express server bundle
- `dist/public/` - Client-side files (HTML, CSS, JS)
- `dist/public/index.html` - Main HTML file
- `dist/public/assets/` - Compiled assets

#### 4. How It Works
1. `npm run build` builds both client and server
2. `npm start` runs the Express server from `dist/index.js`
3. Server serves static files from `dist/public/`
4. Server handles API routes at `/api/*`
5. All other routes serve the React app

## Deployment Steps

1. **Configure Deployment**
   - Open Replit deployment settings
   - Set deployment target to "Autoscale"
   - Update public directory to "dist/public"
   - Add run command "npm start"

2. **Test Locally**
   ```bash
   npm run build
   npm start
   ```

3. **Deploy**
   - The deployment will now work correctly
   - The app will be available at your Replit app URL
   - Both frontend and API endpoints will function

## Why This Configuration is Required

- **Static Deployment**: Only serves HTML/CSS/JS files, no server-side logic
- **Autoscale Deployment**: Runs a Node.js server, can handle API routes and database connections
- **This App**: Needs autoscale because it has API endpoints and server-side functionality

The application architecture requires a running server to:
- Handle API routes for book data
- Process contact form submissions
- Serve the React application
- Manage database connections