# API Contract for Task Operations

## Base URL
`/api/tasks`

## Endpoints

### GET /api/tasks
Retrieve all tasks for the authenticated user.

#### Headers
- Authorization: Bearer {jwt_token}

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "completed": false,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/tasks
Create a new task for the authenticated user.

#### Headers
- Authorization: Bearer {jwt_token}

#### Request Body
```json
{
  "title": "string",
  "description": "string"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": false,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

### PUT /api/tasks/{id}
Update an existing task for the authenticated user.

#### Headers
- Authorization: Bearer {jwt_token}

#### Request Body
```json
{
  "title": "string",
  "description": "string"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": false,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

### DELETE /api/tasks/{id}
Delete a task for the authenticated user.

#### Headers
- Authorization: Bearer {jwt_token}

#### Response
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### PATCH /api/tasks/{id}/complete
Toggle the completion status of a task.

#### Headers
- Authorization: Bearer {jwt_token}

#### Request Body
```json
{
  "completed": true
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```