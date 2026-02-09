# Frontend Quickstart Guide

## Prerequisites

- Node.js 18+ installed
- Access to the backend API (running on localhost:8000 or designated endpoint)
- Git for version control

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Key Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page (redirects to auth or dashboard)
├── login/             # Login page
├── signup/            # Signup page
└── dashboard/         # Protected dashboard area
components/            # Reusable UI components
lib/                   # Utility functions and services
styles/                # Global styles and Tailwind config
public/                # Static assets
```

## Authentication Flow

1. Unauthenticated users are redirected to the login page
2. Users can sign up with email/password
3. After authentication, users are redirected to the dashboard
4. All routes under `/dashboard` are protected

## Making API Requests

Use the API service in `lib/api/tasks.ts` to interact with the backend:

```typescript
import { createTask, getTasks, updateTask, deleteTask } from '@/lib/api/tasks';

// Get all tasks
const tasks = await getTasks();

// Create a new task
const newTask = await createTask({ title: 'New task', description: 'Description' });

// Update a task
const updatedTask = await updateTask('task-id', { title: 'Updated title' });

// Delete a task
await deleteTask('task-id');
```

## Styling Guidelines

- Use Tailwind CSS utility classes for styling
- Follow the design specification for colors, spacing, and typography
- Colors: Primary #6366f1, Success #10b981, Danger #ef4444
- Typography: Inter font, 16px base size
- Rounded corners: rounded-xl for cards/buttons
- Shadows: shadow-md with hover:shadow-lg