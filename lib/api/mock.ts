// Mock API for demonstration purposes
// In a real application, this would be replaced with actual API calls to the backend

// Simulate a delay for API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
let currentUser: { id: string; email: string; name: string } | null = null;

// Mock tasks data
let mockTasks: {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}[] = [];

// Mock API functions
export const mockApi = {
  // Auth functions
  async login(email: string, password: string) {
    await delay(500); // Simulate network delay
    
    // In a real app, this would call the actual auth API
    if (email && password) {
      currentUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0] // Use email prefix as name for demo
      };
      return { success: true, user: currentUser };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  async signup(name: string, email: string, password: string) {
    await delay(500); // Simulate network delay
    
    // In a real app, this would call the actual auth API
    if (email && password && name) {
      currentUser = {
        id: `user_${Date.now()}`,
        email,
        name
      };
      // Initialize empty task list for new user
      mockTasks = [];
      return { success: true, user: currentUser };
    }
    return { success: false, error: 'Invalid data' };
  },

  async logout() {
    await delay(300);
    currentUser = null;
    return { success: true };
  },

  // Task functions
  async getTasks() {
    await delay(500); // Simulate network delay
    
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    return { success: true, data: mockTasks };
  },

  async createTask(title: string, description: string) {
    await delay(500); // Simulate network delay
    
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    if (!title.trim()) {
      return { success: false, error: 'Title is required' };
    }
    
    const newTask = {
      id: `task_${Date.now()}`,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockTasks.push(newTask);
    
    return { success: true, data: newTask };
  },

  async updateTask(id: string, updates: Partial<{ title: string; description: string; completed: boolean }>) {
    await delay(500); // Simulate network delay
    
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return { success: false, error: 'Task not found' };
    }
    
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return { success: true, data: mockTasks[taskIndex] };
  },

  async deleteTask(id: string) {
    await delay(500); // Simulate network delay
    
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const initialLength = mockTasks.length;
    mockTasks = mockTasks.filter(t => t.id !== id);
    
    if (mockTasks.length === initialLength) {
      return { success: false, error: 'Task not found' };
    }
    
    return { success: true, message: 'Task deleted successfully' };
  },

  async toggleTaskCompletion(id: string, completed: boolean) {
    await delay(500); // Simulate network delay
    
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const taskIndex = mockTasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return { success: false, error: 'Task not found' };
    }
    
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      completed,
      updatedAt: new Date().toISOString()
    };
    
    return { success: true, data: mockTasks[taskIndex] };
  }
};