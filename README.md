# Todo Web Application - Frontend

This is the frontend for a cute & friendly, yet clean and professional todo web application. Built with Next.js, TypeScript, and Tailwind CSS following the specified design language.

## Features

- User authentication (registration and login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design for all device sizes
- Pleasant visual experience with the specified color palette
- Proper loading, empty, and error state handling
- Micro-interactions for enhanced user experience

## Tech Stack

- Next.js 14+
- TypeScript
- Tailwind CSS
- Better Auth for authentication
- React Hook Form + Zod for form validation
- Lucide React for icons

## Design Specifications

- Color palette: Primary #6366f1, Success #10b981, Danger #ef4444
- Typography: Inter font family
- Rounded corners: rounded-xl for buttons and cards
- Shadows: shadow-md for cards, increasing on hover
- Micro-interactions: button hover scale, checkbox bounce

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                 # Next.js app router pages
├── layout.tsx      # Root layout
├── page.tsx        # Home page (redirects to auth or dashboard)
├── login/          # Login page
├── signup/         # Signup page
└── dashboard/      # Protected dashboard area
  ├── layout.tsx    # Dashboard layout with header/sidebar
  └── page.tsx      # Main dashboard page
components/          # Reusable UI components
lib/                # Utility functions and services
├── auth.ts         # Authentication utilities
└── api/
  └── tasks.ts      # Task API service
styles/             # Global styles and Tailwind config
types/              # TypeScript type definitions
hooks/              # Custom React hooks
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues