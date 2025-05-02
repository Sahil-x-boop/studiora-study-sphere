
import React, { useState } from 'react';
import { Check, Clock, Plus, Trash2, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
}

const SAMPLE_CATEGORIES = [
  'Math', 'Science', 'History', 'English', 'Computer Science', 'Physics', 'Chemistry'
];

interface TaskListProps {
  maxItems?: number;
  showViewAll?: boolean;
  filterCompleted?: boolean;
}

export function TaskList({ maxItems, showViewAll = false, filterCompleted }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete math homework', completed: false, dueDate: '2025-05-05', priority: 'high', category: 'Math' },
    { id: '2', title: 'Read chapter 5', completed: false, dueDate: '2025-05-03', priority: 'medium', category: 'Science' },
    { id: '3', title: 'Prepare study notes', completed: true, category: 'History' },
    { id: '4', title: 'Review for quiz', completed: false, dueDate: '2025-05-10', priority: 'low', category: 'English' },
    { id: '5', title: 'Research paper outline', completed: false, dueDate: '2025-05-12', priority: 'high', category: 'English' },
    { id: '6', title: 'Code project', completed: false, dueDate: '2025-05-15', priority: 'medium', category: 'Computer Science' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      dueDate: newTaskDueDate || undefined,
      priority: newTaskPriority,
      category: newTaskCategory || undefined
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskCategory('');
    setNewTaskPriority('medium');
    setNewTaskDueDate('');
    setShowNewTaskForm(false);
    
    toast({
      title: "Task created",
      description: "Your new task has been added to the list.",
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      if (!task.completed) {
        toast({
          title: "Task completed",
          description: `"${task.title}" marked as completed.`,
        });
      }
    }
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.title}" has been removed.`,
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showNewTaskForm) {
      setShowNewTaskForm(true);
    } else if (e.key === 'Enter' && showNewTaskForm) {
      addTask();
    }
  };

  // Filter tasks based on props
  let filteredTasks = tasks;
  
  if (filterCompleted !== undefined) {
    filteredTasks = tasks.filter(task => task.completed === filterCompleted);
  }
  
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);
  
  // Limit number of tasks if maxItems is provided
  const limitedPendingTasks = maxItems ? pendingTasks.slice(0, maxItems) : pendingTasks;
  const limitedCompletedTasks = maxItems ? completedTasks.slice(0, Math.min(maxItems - limitedPendingTasks.length, completedTasks.length)) : completedTasks;

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
  
  // Get priority badge color
  const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-studiora-800">Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input
            placeholder={showNewTaskForm ? "Task title..." : "Add a new task..."}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow"
          />
          {!showNewTaskForm && (
            <Button onClick={() => setShowNewTaskForm(true)} className="bg-studiora-600 hover:bg-studiora-700 text-white">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
        
        {showNewTaskForm && (
          <div className="mb-6 space-y-4 bg-studiora-50 p-4 rounded-lg border border-studiora-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Category</label>
                <select 
                  className="w-full border border-gray-200 rounded-md p-2 text-sm"
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {SAMPLE_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Priority</label>
                <select 
                  className="w-full border border-gray-200 rounded-md p-2 text-sm"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 block mb-1">Due Date</label>
              <input 
                type="date"
                className="w-full border border-gray-200 rounded-md p-2 text-sm"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNewTaskForm(false);
                  setNewTaskTitle('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={addTask} className="bg-studiora-600 hover:bg-studiora-700 text-white">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div>
            <h3 className="text-sm font-medium text-studiora-600 mb-3">PENDING ({pendingTasks.length})</h3>
            {limitedPendingTasks.length > 0 ? (
              <div className="space-y-2">
                {limitedPendingTasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="border-studiora-400 data-[state=checked]:bg-studiora-500"
                    />
                    <span className="flex-grow">{task.title}</span>
                    <div className="flex items-center gap-2">
                      {task.category && (
                        <Badge variant="outline" className="text-xs border-studiora-200 text-studiora-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {task.category}
                        </Badge>
                      )}
                      {task.priority && (
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      )}
                      {task.dueDate && (
                        <span className="text-xs text-gray-500 flex items-center whitespace-nowrap">
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
                  </div>
                ))}
                
                {maxItems && pendingTasks.length > maxItems && (
                  <div className="text-center text-sm text-studiora-600">
                    {pendingTasks.length - maxItems} more pending tasks...
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No pending tasks</p>
              </div>
            )}
          </div>
          
          {limitedCompletedTasks.length > 0 && (
            <>
              <Separator />
              
              {/* Completed Tasks */}
              <div>
                <h3 className="text-sm font-medium text-studiora-600 mb-3">COMPLETED ({completedTasks.length})</h3>
                <div className="space-y-2">
                  {limitedCompletedTasks.map(task => (
                    <div key={task.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <div className="rounded-sm w-4 h-4 flex items-center justify-center bg-studiora-500 text-white">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="flex-grow line-through text-gray-500">{task.title}</span>
                      <div className="flex items-center gap-1">
                        {task.category && (
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-200">
                            {task.category}
                          </Badge>
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
                    </div>
                  ))}
                  
                  {maxItems && completedTasks.length > limitedCompletedTasks.length && (
                    <div className="text-center text-sm text-studiora-600">
                      {completedTasks.length - limitedCompletedTasks.length} more completed tasks...
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          {showViewAll && (
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline"
                className="text-studiora-600 border-studiora-200 text-sm"
                onClick={() => navigate('/tasks')}
              >
                View All Tasks
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
