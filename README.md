RunToSip Frontend + Backend

Development
1. Create a .env file at project root (see .env.example)
2. Ensure PostgreSQL is running on localhost:5432
3. Run migrations:
   npm run migrate
4. Start API and client together:
   npm run dev:all

API
- Base: /api
- Endpoints:
  - GET /api/health
  - GET /api/events
  - GET /api/events/:id
  - POST /api/events
  - PUT /api/events/:id
  - DELETE /api/events/:id
  - POST /api/events/:id/join
