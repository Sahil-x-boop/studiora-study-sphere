import React, { useState } from 'react';
import { Check, Clock, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete math homework', completed: false, dueDate: '2025-05-05' },
    { id: '2', title: 'Read chapter 5', completed: false, dueDate: '2025-05-03' },
    { id: '3', title: 'Prepare study notes', completed: true },
    { id: '4', title: 'Review for quiz', completed: false, dueDate: '2025-05-10' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Format date to be more readable
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Otherwise return formatted date
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-studiora-800">Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={addTask} className="studiora-button-gradient text-white">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div>
            <h3 className="text-sm font-medium text-studiora-600 mb-3">PENDING ({pendingTasks.length})</h3>
            {pendingTasks.length > 0 ? (
              <div className="space-y-2">
                {pendingTasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="border-studiora-400 data-[state=checked]:bg-studiora-500"
                    />
                    <span className="flex-grow">{task.title}</span>
                    {task.dueDate && (
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteTask(task.id)}
                      className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No pending tasks</p>
              </div>
            )}
          </div>
          
          {completedTasks.length > 0 && (
            <>
              <Separator />
              
              {/* Completed Tasks */}
              <div>
                <h3 className="text-sm font-medium text-studiora-600 mb-3">COMPLETED ({completedTasks.length})</h3>
                <div className="space-y-2">
                  {completedTasks.map(task => (
                    <div key={task.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <div className="rounded-sm w-4 h-4 flex items-center justify-center bg-studiora-500 text-white">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="flex-grow line-through text-gray-500">{task.title}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteTask(task.id)}
                        className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
