# Capstone Backend

A secure Express.js backend for the capstone project. It includes authentication, chat API with file upload support, logout flow, and a demo request service.

## Tech Stack

- Node.js
- Express.js
- JWT (JSON Web Token)
- bcryptjs
- express-validator
- Helmet
- CORS
- express-rate-limit
- Multer

## Requirements

- Node.js 18 or later
- npm 9 or later

## Setup

1. Open a terminal in the project folder:

```bash
cd /Users/kshitiz.saxenayahoo.com/Data/work/learning/capstone/capstone-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your values:

```env
PORT=4000
JWT_SECRET=your-super-secure-random-string
CORS_ORIGIN=http://localhost:5173
```

## Run in Development Mode

```bash
npm run dev
```

The server will start at:

```bash
http://localhost:4000
```

## Production Start

```bash
npm start
```

## Health Check

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

## API Endpoints

### Auth

#### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "Demo@123"
  }'
```

#### Get Current User

```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

#### Logout

```bash
curl -X POST http://localhost:4000/api/auth/logout \
  -H "Authorization: Bearer <token>"
```

### Chat with File Upload

```bash
curl -X POST http://localhost:4000/api/chat \
  -H "Authorization: Bearer <token>" \
  -F "message=Hello, can you review my document?" \
  -F "files=@/path/to/file.pdf"
```

Notes:
- Only specific file types are allowed: PDF, DOC, DOCX, XLS, XLSX, TXT, CSV, JSON, PNG, JPG
- Maximum file size is 5 MB per file
- Maximum 3 files per request

### Request Demo

```bash
curl -X POST http://localhost:4000/api/request-demo \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "company": "Acme Corp",
    "message": "We would like to book a product demo."
  }'
```

## Security Features

- JWT authentication for protected routes
- Helmet for security headers
- CORS configuration
- Rate limiting
- File upload validation
- Input validation using express-validator
- Password hashing using bcryptjs

## Testing

This project currently contains the backend structure and validation flow, and is ready to extend with automated tests.

For a basic smoke test, use:

```bash
curl http://localhost:4000/health
```

For future unit and integration tests, you can add a framework such as:

- Jest
- Supertest

Example installation:

```bash
npm install --save-dev jest supertest
```

## Deployment

This backend can be deployed to any Node.js hosting platform, such as:

- Render
- Railway
- Fly.io
- DigitalOcean App Platform
- Vercel (for frontend only, not backend)

### Example deployment checklist

1. Set environment variables in the deployment dashboard:
   - `PORT`
   - `JWT_SECRET`
   - `CORS_ORIGIN`

2. Run install step in the deployment environment:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

4. Make sure your frontend points to the deployed backend URL instead of `localhost`.

## Notes

- This is a starter secure backend for the capstone project.
- It uses in-memory mock user data for demonstration purposes.
- For production, replace mock users with a real database such as PostgreSQL and connect via Prisma or Sequelize.

## License

MIT
