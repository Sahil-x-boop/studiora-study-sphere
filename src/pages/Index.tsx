
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { TaskList } from '@/components/tasks/TaskList';
import { StudyStats } from '@/components/dashboard/StudyStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, BookOpen, CheckSquare } from 'lucide-react';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-studiora-950">Welcome back, John!</h1>
              <p className="text-gray-500">Track your progress, manage tasks, and focus on your studies.</p>
            </header>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-studiora-800 mb-4">Study Overview</h2>
              <StudyStats />
            </section>
            
            <Separator className="my-8" />
            
            <div className="grid gap-6 md:grid-cols-2">
              <section>
                <h2 className="text-xl font-semibold text-studiora-800 mb-4">Study Timer</h2>
                <PomodoroTimer />
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-studiora-800 mb-4">Your Tasks</h2>
                <TaskList />
              </section>
            </div>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-studiora-800 mb-4">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-fit rounded-full bg-studiora-100 text-studiora-700">
                      <Clock className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg text-studiora-800">Start Study Session</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Begin your next focused study period</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-fit rounded-full bg-studiora-100 text-studiora-700">
                      <CheckSquare className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg text-studiora-800">Add New Task</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Create a new assignment or to-do</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="p-2 w-fit rounded-full bg-studiora-100 text-studiora-700">
                      <BookOpen className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg text-studiora-800">Create Notes</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Take notes for your study materials</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
