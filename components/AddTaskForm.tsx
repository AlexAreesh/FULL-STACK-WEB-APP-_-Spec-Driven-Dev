'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createTask } from '@/lib/api/tasks';
import { useState } from 'react';

// Define the validation schema using Zod
const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface AddTaskFormProps {
  onTaskAdded: () => void; // Callback to refresh the task list
}

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createTask({
        title: data.title,
        description: data.description || '',
        completed: false,
      });

      if (result.success) {
        reset(); // Clear the form
        onTaskAdded(); // Refresh the task list
      } else {
        setError(result.error || 'Failed to create task');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="heading text-xl font-bold text-neutral-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            {...register('title')}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
              errors.title ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="What needs to be done?"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
              errors.description ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="Additional details (optional)"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-hover bg-primary-500 hover:bg-primary-400 text-white font-medium py-2 px-6 rounded-xl transition-colors duration-200 flex items-center"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span> Adding...
              </>
            ) : (
              'Add Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}