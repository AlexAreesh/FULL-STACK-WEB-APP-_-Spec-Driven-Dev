'use client';

import { Task } from '@/types/task';
import TaskItem from '@/components/TaskItem';
import { useState, useEffect } from 'react';
import { getTasks } from '@/lib/api/tasks';

interface TaskListProps {
  onTaskUpdate: () => void; // Callback when a task is updated to refresh the list
}

export default function TaskList({ onTaskUpdate }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [onTaskUpdate]); // Fetch tasks when onTaskUpdate changes

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getTasks();
      if (response.success && response.data) {
        setTasks(response.data);
      } else {
        setError(response.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Separate completed and active tasks
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (loading) {
    return <div className="text-center py-8 text-neutral-500">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 && (
        <section>
          <h2 className="heading text-xl font-bold text-neutral-800 mb-4">Active Tasks</h2>
          <div>
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
          </div>
        </section>
      )}

      {completedTasks.length > 0 && (
        <section>
          <h2 className="heading text-xl font-bold text-neutral-800 mb-4">Completed Tasks</h2>
          <div>
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
          </div>
        </section>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <p>No tasks yet. Add your first task to get started!</p>
        </div>
      )}
    </div>
  );
}