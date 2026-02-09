export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}