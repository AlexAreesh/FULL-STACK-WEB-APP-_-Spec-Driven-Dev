'use client';

import { Task } from '@/types/task';
import { toggleTaskCompletion, deleteTask } from '@/lib/api/tasks';
import { useState } from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void; // Callback to refresh the task list
}

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleCompletion = async () => {
    try {
      await toggleTaskCompletion(task.id, !task.completed);
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onUpdate(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-md transition-all duration-300 ${
        task.completed ? 'opacity-70' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={handleToggleCompletion}
          className={`mr-3 checkbox-bounce ${task.completed ? 'text-success-500' : 'text-neutral-500'}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <div>
          <h3 className={`font-medium ${task.completed ? 'line-through text-neutral-500' : 'text-neutral-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'line-through text-neutral-400' : 'text-neutral-500'}`}>
              {task.description}
            </p>
          )}
          <p className="text-xs text-neutral-400 mt-1">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-danger-500 hover:text-danger-700 btn-hover p-1 rounded-full"
        aria-label="Delete task"
      >
        {isDeleting ? (
          <span className="animate-spin">⏳</span>
        ) : (
          <Trash2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}