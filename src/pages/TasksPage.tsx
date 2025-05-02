
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TaskList } from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import { Calendar, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TasksPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-8">
            <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-studiora-950">Tasks</h1>
                <p className="text-gray-500">Keep track of your assignments and homework.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-studiora-200 text-studiora-700">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="border-studiora-200 text-studiora-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date
                </Button>
                <Button className="studiora-button-gradient text-white">
                  + Add Task
                </Button>
              </div>
            </header>
            
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                <TabsTrigger value="all" className="data-[state=active]:bg-studiora-500 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-studiora-500 data-[state=active]:text-white">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-studiora-500 data-[state=active]:text-white">
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <TaskList />
              </div>
              
              <div>
                <div className="bg-studiora-50 p-6 rounded-lg border border-studiora-100">
                  <h3 className="font-semibold text-studiora-800 mb-4">Task Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tasks</span>
                      <span className="font-medium">16</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-medium">13</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Today</span>
                      <span className="font-medium text-red-500">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due This Week</span>
                      <span className="font-medium text-amber-500">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-medium text-studiora-600">18.75%</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-semibold text-studiora-800 mb-2">Most Productive Day</h3>
                    <p className="text-gray-600">Monday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TasksPage;
