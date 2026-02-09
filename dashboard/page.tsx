'use client';

import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';
import { useState } from 'react';

export default function DashboardPage() {
  const [taskAddedTrigger, setTaskAddedTrigger] = useState(0);

  const handleTaskAdded = () => {
    // Update the trigger to force a refresh of the task list
    setTaskAddedTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="heading text-3xl font-bold text-neutral-800">My Tasks</h1>
        <p className="text-neutral-600 mt-2">Manage your tasks efficiently</p>
      </div>

      <AddTaskForm onTaskAdded={handleTaskAdded} />
      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="heading text-xl font-bold text-neutral-800 mb-4">Task List</h2>
        <TaskList onTaskUpdate={handleTaskAdded} />
      </div>
    </div>
  );
}