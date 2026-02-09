import { Task } from '@/types/task';
import { mockApi } from './mock';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch all tasks for the authenticated user
 */
export async function getTasks(): Promise<ApiResponse<Task[]>> {
  // Use mock API in development
  if (process.env.NODE_ENV === 'development') {
    return mockApi.getTasks() as Promise<ApiResponse<Task[]>>;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, we would include the auth token
        // 'Authorization': `Bearer ${authToken}`,
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch tasks');
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Create a new task
 */
export async function createTask(taskData: Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Task>> {
  // Use mock API in development
  if (process.env.NODE_ENV === 'development') {
    return mockApi.createTask(taskData.title, taskData.description) as Promise<ApiResponse<Task>>;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, we would include the auth token
        // 'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to create task');
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Update an existing task
 */
export async function updateTask(id: string, taskData: Partial<Task>): Promise<ApiResponse<Task>> {
  // Use mock API in development
  if (process.env.NODE_ENV === 'development') {
    return mockApi.updateTask(id, taskData) as Promise<ApiResponse<Task>>;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, we would include the auth token
        // 'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(taskData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to update task');
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Delete a task
 */
export async function deleteTask(id: string): Promise<ApiResponse<string>> {
  // Use mock API in development
  if (process.env.NODE_ENV === 'development') {
    return mockApi.deleteTask(id) as Promise<ApiResponse<string>>;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, we would include the auth token
        // 'Authorization': `Bearer ${authToken}`,
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete task');
    }

    return { success: true, data: result.message };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskCompletion(id: string, completed: boolean): Promise<ApiResponse<Task>> {
  // Use mock API in development
  if (process.env.NODE_ENV === 'development') {
    return mockApi.toggleTaskCompletion(id, completed) as Promise<ApiResponse<Task>>;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // In a real implementation, we would include the auth token
        // 'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ completed }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to update task completion status');
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}