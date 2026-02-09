# Data Model for Frontend Todo Application

## Task Entity

### Properties
- **id**: string (unique identifier per user)
- **title**: string (task title/name)
- **description**: string (optional detailed description)
- **completed**: boolean (completion status)
- **createdAt**: Date (timestamp when task was created)
- **updatedAt**: Date (timestamp when task was last updated)

### Validation Rules
- Title must be between 1-255 characters
- Description must be between 0-1000 characters
- Completed defaults to false
- createdAt and updatedAt are automatically managed by the system

### State Transitions
- New task: `completed = false`
- Mark complete: `completed = true`
- Mark incomplete: `completed = false`

## User Entity (from authentication)

### Properties
- **id**: string (unique user identifier)
- **email**: string (user's email address)
- **name**: string (user's display name)
- **createdAt**: Date (account creation timestamp)

## API Contract Summary

### Task Operations
- GET `/api/tasks` - Retrieve user's tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task
- PATCH `/api/tasks/:id/complete` - Toggle completion status

### Expected Response Format
```typescript
interface TaskResponse {
  success: boolean;
  data?: Task | Task[];
  error?: string;
}
```

## Frontend State Structure
```typescript
interface AppState {
  user: User | null;
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
```